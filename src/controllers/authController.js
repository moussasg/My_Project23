const User = require('../models/User');//on l'utilise en createToken
const jwt = require('jsonwebtoken');//jsonwebtoken structure de données dans les échange de données entre 2 entité ou ya ادعاءات/ pour structuré / library used in Node.js to generate and verify JWTs for implementing authentication and authorization mechanisms.
const bcrypt = require('bcrypt')
const Command = require('../models/commands');
////2) Authcontroller : comunique avec mongoose / modules or classes for handling authentication-routes logic and endpoints. for signup+signin et export les
// handle errors
  const requireAuth = (req, res, next) => { // spéciale pour node pas pour react
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          // Si une erreur se produit, redirigez l'utilisateur vers la page de connexion
          res.redirect('/login');
        } else {
          console.log(decodedToken);
          next();
        }
      });
    } else {
      // Si aucun token n'est présent, redirigez l'utilisateur vers la page de connexion
      res.redirect('/login');
    }
  };
  const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }
  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}
//fin du handle error/ token =  value of the cookie = cockie data envoyé du serveur web vers le clients
// create json web token
const maxAge = 3 * 24 * 60 * 60;// age a intérieur du jwt / jour/heure/minute/sec
const createToken = (id) => {// on introduit a intérieur des posts dans const token
  return jwt.sign({ id }, 'net ninja secret', {// net ninja secret = secret key or passphrase used for signing JSON Web Tokens (JWT) 
    expiresIn: maxAge
  });
};
// controller actions
// controller actions for signup(post , get) + login(post,get) on les exports vers AuthRoutes
const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, user: user._id , token})// TR2S TR2S IMPortantT défini token fel back aprés signup
    // Après une connexion réussie
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ success: false, errors });
  }
}
const users_get = async (req, res) => { // get all users na pas de raltion f les routes
  const { email, password } = req.body;// pour accéder aux données envoyées dans le corps de la requête : pour post
  try {
    const users = await User.find(email, password);
    res.json(users)
    // Après une connexion réussie
  }
  catch (err) {
    res.status(400).json({ success: false, errors });
  }
}
const user_get = async (req, res) => { // get spécifique user
  const { email } = req.query;// query pour récupéré email a partir de url
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false});
    }
  } catch (err) {
    res.status(500).json({ success: false});
  }
}
const commands_post = async (req,res) => {
  const {prenom , adress , numero , prix, quantité , marque , nom} = req.body;
  try {
    const command = await Command.create({prenom,adress,numero,quantité,marque, nom , prix})
    console.log(command)
    res.status(200).json({ success: true , prenom:command.prenom ,adress:command.adress, numero:command.numero, quantité:command.quantité,marque:command.marque ,nom:command.nom , prix:command.prix});
  }
  catch(err) {
    res.status(400).json({ success: false });
  }
}
const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, user: user._id , token });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ success: false, errors });
  }
}
module.exports = {
  signup_post,
  users_get,
  user_get,
  login_post,
  checkUser,
  requireAuth,
  commands_post,
}

