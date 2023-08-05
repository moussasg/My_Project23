const express = require('express');
const app = express(); // Add parentheses to call the express function
const User = require('./src/models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const authController = require('./src/controllers/authController');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { router } = require('./src/controllers/route'); // Add curly braces around "router"
app.use(express.json());
app.use('/', () => router)///trés trés trés trés trés importante
const CheckUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
      }
      next();
    });
  } else {
    res.locals.user = null;
    next();
  }
};
app.use(CheckUser);
app.use(cookieParser());
// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors({origin: true, credentials: true}));
// Database connection
const dbURI = 'mongodb+srv://myjwt:9IzN7JaizU41xKTY@cluster0.lseehws.mongodb.net/jwt?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connexion réussie à la base de données"))
  .catch((err) => console.log(err));
// Route '/signup'
// Use the CheckUser middleware for all routes
app.use(CheckUser);
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
