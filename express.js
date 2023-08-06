const express = require('express');
const app = express(); // Add parentheses to call the express function
const mongoose = require('mongoose');
const authController = require('./src/controllers/authController')
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.post('/signup', authController.signup_post);
app.post('/login', authController.login_post);
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
// Database connection
const dbURI = 'mongodb+srv://myjwt:9IzN7JaizU41xKTY@cluster0.lseehws.mongodb.net/jwt?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion réussie à la base de données'))
  .catch((err) => console.log(err));

// Start the server
app.listen(3001, () => {
  console.log(`Server started on port 3001`);
});
