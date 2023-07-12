// classe : modél d'objet
// useeffect : hook) dans React qui permet d'effectuer des effets de côté dans les composants fonctionnels 
// d'exécuter des 'actions après le rendu', de n'ettoyer les effets' lors du démontage du composant 
import express from 'express';
import nodemailer from 'nodemailer'; // module du node.js pour envoie automatique des emails par protocol smtp
import cors from 'cors';
import bodyParser from 'body-parser';// midelware pour envoi de requette du front au back
import mongoose from 'mongoose'; // driver mongodb
import dotenv from 'dotenv';
dotenv.config();
const app = express(); // facilite la création de serveur et traite les requettes
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // /// pour : Allow Control Acces Origin
app.use(bodyParser.json());
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
const sendMail = (receiver) => { // receiver = email du client
  return new Promise((resolve, reject) => { // nutiliziwhome aprés transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'moussaswag5@gmail.com',
        pass: 'omxwbebucpedfgcb', // njob m google acount double authent
      },
    });
    transporter.sendMail(
      {
        from: 'moussaswag5@gmail.com',
        to: receiver,
        subject: 'Registration Hydra smartphones',
        text: 'Thank you for registration',
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};
const emailSchema = new mongoose.Schema({
  receiver: String,
}); // le modèle est associé à une collection spécifique f database , EmailModel ndiroh dakhel el Post
const EmailModel = mongoose.model('Email', emailSchema);// Email modél : j'ai  créer collectoin emails f atlas , par défault ywli pluriel wpremiére letre minuscule
app.post('/sendmail', async (req, res) => {
  try {
    const { receiver } = req.body;
    await sendMail(receiver);
    const newEmail = new EmailModel({ receiver }); // model 7ate fihe receiver
    await newEmail.save(); // sayvih tcho
    res.send('Email sent successfully');
  } 
  catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
const userSchema = new mongoose.Schema({ // ndiroha fel model
  email: String,
  password: String,
}); // User modéle,  ndiroh dakhel el Post ,  le modèle est associé à une collection spécifique f database
const User = mongoose.model('User', userSchema); // User = modéle , j'ai  créer collectoin users f atlas ,par défault mongoose utilise nom pluriel et premiére lettre minuscule 
app.post('/api/users', async (req, res) => { // posté des users f sign.up
  try {
    const { email, password } = req.body;
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
app.get('/api/users/', async (req, res) => {
  try {
    const { email, password } = req.query; // req.query pour récupéré  email and password from the query parameters
    // meme chose que const email = req.query.email;
   // const password = req.query.password
   //// dans url pas la peine d'écire email psq j'ai déstrécturé les 2 par req.query
    const existingUser = await User.findOne({ email, password });
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('An error occurred while verifying the user', err);
    res.status(500).send(err.message);
  }
});
app.get('/sendmail', async (req, res) => {
  try {
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
app.use((req, res, next) => { /// A C A O 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(3002, () => {
  console.log('Server started on port 3002');
});
