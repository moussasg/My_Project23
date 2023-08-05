const User = require('../models/User');//on l'utilise en createToken
const jwt = require('jsonwebtoken');//jsonwebtoken structure de données dans les échange de données entre 2 entité ou ya ادعاءات/ pour structuré / library used in Node.js to generate and verify JWTs for implementing authentication and authorization mechanisms.
const bcrypt = require('bcrypt')
////2) Authcontroller : comunique avec mongoose / modules or classes for handling authentication-routes logic and endpoints. for signup+signin et export les
// handle errors
const RequireAuth = (req, res, next) => { // exporte vers app.js
  const token = req.cookies.jwt; // récupéré valeur du token from cookie
  // check json web token exists & is verified
  if (token) {// if token valide  / 'net ninja secret' clé secret de token le meme pour token d'inscription + connexion
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {//serverdecoded token
      if (err) { // si n'est pas valide
        console.log(err.message);
        res.redirect('/login');
      } else {// si  valide
        console.log(decodedToken);
        res.redirect('/products');
        next();
      }
    });
  } else {
    res.redirect('/login');
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
exports.signup_get = (req, res) => {
  res.json({ signup: true }); // fel get nutilisi res.render
}
exports.login_get = (req, res) => {
  res.json({ login: true });
}
exports.products_get = (req, res) => {
  // Your logic to handle the '/products' route goes here
  res.render('products');
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.json({ user: newUser });
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
module.exports = {
  RequireAuth,
  User
};