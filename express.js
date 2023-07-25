//classe : modéle d'objet ont les memes propriété
// useeffect : hook) dans React qui permet d'effectuer des effets dans les composants fonctionnels 
// d'exécuter des 'actions après le rendu', de n'ettoyer les effets' lors du démontage du composant
//useEffect(callback , [dependencies])
import express from 'express';//framework node.js facilite la création de serveur et traite les requettes
import nodemailer from 'nodemailer'; //module du node.js pour envoie automatique des emails par protocol smtp
import cors from 'cors';//'Cross-Origin Resource Sharing':mécanisme de sécurité utilisé par les navigateurs web pour contrôler les requêtes effectuées 
import bodyParser from 'body-parser';// bibliothèque middleware utilisée dans les applications 'Node.js/Express' pour 'analyser les données json' , du corps (body) des requêtes HTTP.
import mongoose from 'mongoose';//driver mongodb
import dotenv from 'dotenv'; //pour stocker des 'variables d'environnement' utilisé dans node.js /définir des valeurs de configuration sensibles, telles que des clés d'API,
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // /// pour : 'Cross-Origin Resource Sharing': mécanisme de sécurité utilisé par les navigateurs web
app.use(bodyParser.json()); //utilisée dans les applications 'Node.js/Express' pour 'analyser les données json'
mongoose.connect(process.env.DBU, { // DBU f .env
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Unable to connect to the database', error);
  })
const sendMail = (receiver) => { // receiver = email du client inclut f transporter
  return new Promise((resolve, reject) => { // resolve =  réussite , reject = error , nutiliziwhome aprés transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'moussaswag5@gmail.com',
        pass: 'omxwbebucpedfgcb', // jbto m google acount double authent
      },
    });
    transporter.sendMail(
      {
        from: 'moussaswag5@gmail.com',
        to: receiver, /// receiver définiha f const sendMail
        subject: 'Registration Hydra smartphones',
        text: 'Thank you for registration',
      },
      (error, info) => {
        if (error) {
          reject(error);
        }
        else { // si juste
          resolve(info);
        }
      } ///fin d'error - info
    );
  }
  )
};
/// mongodb
const emailSchema = new mongoose.Schema({ /// ndiroh dakhel el model
  receiver: String,
}); // le modèle est associé à une collection spécifique f database , EmailModel ndiroh dakhel el Post
const EmailModel = mongoose.model('Email', emailSchema); // Email modél : j'ai  créer collectoin emails f atlas , par défault ywli pluriel wpremiére letre minuscule
app.post('/sendmail', async (req, res) => { // async : pour déclarer une fonction asynchrone,  
//requette : Variable représentant {l'objet} de requête contient les info envoyé par client au serveur , 
//response : Variable représentant {l'objet} de réponse (response) définir et d'envoyer la réponse du serveur au client. 
//variable : utilisé pour stocker des données en mémoire
  try {
    const { receiver } = req.body;//pour récupérer les données envoyées par le client dans une requête POST
    await sendMail(receiver); // await fonction asynchrone (async) pour mettre en 'pause' l'exécution et attendre la résolution d'une promesse,
    const newEmail = new EmailModel({ receiver }); // model 7ate fihe receiver
    await newEmail.save(); // sayvih tcho
    res.send('Email sent successfully');
  } 
  catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}); // get specifique receiver
app.get('/sendmail', async (req, res) => { 
  try { // http://localhost:3002/sendmail?receiver=exp@gmail.com pour cherché spécifique 
    const receiver = req.query.receiver; // donc il faut écrire receiver dans url aprés le ? pour q'il marche exp : http://localhost:3002/sendmail/?receiver=jnjnjnj234@gmail.com
    const emails = await EmailModel.findOne({receiver}); // emails = nom de colelction dans database
    if (emails) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('An error occurred while retrieving emails', err);
    res.status(500).send(err.message);
  } 
})
app.get('/sendmail/all', async (req,res)=> {
  try {
    const emails = await EmailModel.find({}); // emails = nom de colelction dans database
    res.json(emails)
  }
  catch (err) {
    console.error('An error occurred while verifying the user', err);
    res.status(500).send(err.message);
  }
})
///
const userSchema = new mongoose.Schema({ // ndiroha fel model
  email: String,
  password: String,
}); // User modéle,  ndiroh dakhel el Post ,  le modèle est associé à une collection spécifique f database
const User = mongoose.model('User', userSchema); // User = modéle , j'ai  créer collectoin users f atlas ,par défault mongoose utilise nom pluriel et premiére lettre minuscule 
const comandSchema = new mongoose.Schema({
  quantité:String,
  nom:String,
})
const comand = mongoose.model('comand' , comandSchema)
app.post('/comands', async (req, res) => {  
  try {
    const { quantité , nom } = req.body;
    const comands = new comand({ quantité , nom });
    const save = await comands.save();
    res.json(save);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement des commandes' });
  }
});
/// get all comands
app.get('/comands/all' , async(req,res)=> {
  try {
  const existcomand = await comand.find({})
  res.json(existcomand) 
  }
  catch(err) {
    console.log('erreur')
    res.status(500).send(err.message)
  }
})
//http://localhost:3002/api/users?email=exp@gmail.com
app.post('/api/users', async (req, res) => { // posté des users f sign.up
  try {
    const { email, password } = req.body;//pour récupérer les données envoyées par le client au serveur dans une requête POST
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ exists: true });
    } else { // si user n'existe pas
      const newUser = new User({ email, password });
      await newUser.save();
      console.log(`email: ${email}, password: ${password} / inserted into "test" collection with ID ${newUser._id}`);
      res.json({ exists: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.get('/api/users/', async (req, res) => { // get spécifique user
  try {
    const { email } = req.query; // req.query pour récupéré  email and password from the query parameters
    // const { email, password } = req.query meme chose que  
    //email = req.query.email;
   // const password = req.query.password
   //// dans url pas la peine d'écire email psq j'ai déstrécturé les 2 par req.query
    const existingUser = await User.findOne({ email }); // findOne pour spécfique user
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('An error occurred while verifying the user', err);
    res.status(500).send(err.message);
  }
}); /// pour avoir tout les users il faut un url diférent que de spécifique + all
/// get all users
app.get('/api/users/all' , async (req, res) => {
  try {
    const existingUser = await User.find({});//await asynchrone mettre 'pause' l'exécution et attendre la résolution d'une promesse,
    res.json(existingUser)
  }
  catch (err) {
    console.error('An error occurred while verifying the user', err);
    res.status(500).send(err.message);
  }
})
app.use((req, res, next) => { /// A C A O 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
/* //classes : des instances d'objets qui partagent les mêmes propriétés 
//et méthodes définies dans la classe.
*/