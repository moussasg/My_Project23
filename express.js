const express = require('express');
const {requireAuth} = require('./src/controllers/authController')
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
/*
app.get('/logout', authController.requireAuth, (req, res) => {
  res.render('logout');
});
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
const dbURI = 'mongodb+srv://myjwt:fVwnW0b46LnqEC9n@cluster0.iejtzdc.mongodb.net/users?retryWrites=true&w=majority';//// users = NOM DE database su atlas
mongoose.connect( dbURI , { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { /// je peut faire ici connect aprés les autre collection createconnection
  console.log('Connected to userauth and commands');  
})
.catch(() => {
  console.error('erreur userauth');
})
app.listen(3002 , ()=> {
  console.log('3002 port')
})


