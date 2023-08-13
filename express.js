const express = require('express');
const app = express(); // Add parentheses to call the express function
const mongoose = require('mongoose');
const authController = require('./src/controllers/authController')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {checkUser } = require('./src/controllers/authController')
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.post('/signup', authController.signup_post);
app.post('/login', authController.login_post);
app.post('/MesSmartphones/:id', authController.commands_post)
app.get('/users', authController.users_get); // get all users
app.get('/user', authController.user_get); // get spécifique user
app.get('/logout', (req, res) => {
  // Clear the JWT cookie and perform any other necessary logout logic
  res.clearCookie('jwt');
  // Additional logout logic if needed
  // Send a response indicating successful logout
  res.status(200).json({ message: 'Logout successful' });
});
/*
app.get('/logout', authController.requireAuth, (req, res) => {
  res.render('logout');
});
app.get('/products', requireAuth, (req, res) => res.render('products'));
*/
// Route '/logout' - GET route for user logout
/*
app.get('/logout', authController , (req,res)=> {
  res.render('logout');
});
*/
// Middleware
app.get('*', checkUser);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
const dbURI = 'mongodb+srv://myjwt:gHr0wZK7kdwwCG71@cluster0.iejtzdc.mongodb.net/jwt?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données jwt');
  })
  .catch((err) => {
    console.error(err);
  });
const dbcom = 'mongodb+srv://mycomands:HObSfEfaovE11CSb@cluster0.hm0gov7.mongodb.net/com?retryWrites=true&w=majority';
mongoose.connect(dbcom, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données mycommands');
  })
  .catch((err) => {
    console.error(err);
  });
app.listen(3002 , () => {
  console.log('connexced to server at 3002')
})