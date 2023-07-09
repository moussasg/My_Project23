import express from 'express'; //framework node.js traite les requette et les response
const app = express();
app.use(express.urlencoded({ extended: true })) // pour prendre en charge les données de formulaire envoyées depuis votre formulaire React (je vais essayer aprés de éliminer et voir est ce qui'il influe ,!)
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
app.use(cors()) // pour qu'on puisse utilisé au dessous app.use de // A C A O = acces control allow origin
import bodyParser from 'body-parser';// mideelware framework express renvooi les requette de back au front
app.use(bodyParser.json());
import mongoose from 'mongoose'; // driver mongodb
// 1)Connect to the database
mongoose.connect(process.env.DBU , { // DBU dans .env
  useNewUrlParser: true,
}) 
  .then(() => { /// 1/.then(()=>{}) / 2/.catch((error)=> {})
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Unable to connect to the database', error);
  }); // 2)défini schema
const userSchema = new mongoose.Schema({ // userSchema ndiroh dakhel Model
  email: String,
  password: String,
}); 
// 3) User défini model important on réutilise fel post+Get !!! important
const User = mongoose.model('User', userSchema); // Model ndirolo dakhelo email,password , req data sent to the api
/// 4) définie les function postes / get /  use
app.post('/api/users/', async (req, res) => { // post
  const { email , password } = req.body; /// Pour récupérer le [corps] de la requête ki nposti email,password fel body pour utilisé req.body il faut utilisé un middleware bodyparser
  try {// début de try
    const newUser = new User({email , password }); /// User = model
    await newUser.save();
    console.log(`email: ${email} , password: ${password} / inserted into "test" collection with ID ${newUser._id}`);
  } // fin de try
  catch (err) {
    console.log(err);
  }
}); // get
app.get('/api/users/', async (req , res) => { /// GET c trés important pour q'uil cherche dans la base de donné
const { email , password } = req.query; // Objet {req.query} Pour récupérer des paramètres dans une requête HTTP c trés imprtants chriki !!!!!!!!!!!!!
  try { // début de try
    const ancienuser = await User.findOne({ email, password }); /// ancienuser const li t7wss find fel model
    res.json({ exists: ancienuser !== null });// si il existe ancienuser , ancienuser n'est pas nul
  } // fin de try / 'exists' fixe prédifinie / 
  catch (err) {
    console.error("Une erreur s'est produite lors de la vérification de l'utilisateur", err);
  }
});//use
app.use((req, res, next) => { // A C A O 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); //5) port 
app.listen(3002, () => {
  console.log('Server started on port 3002');
});
