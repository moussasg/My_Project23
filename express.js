import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Strategy as LocalStrategy } from 'passport-local';
import ejs from 'ejs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const secretKey = crypto.randomBytes(32).toString('hex');
const app = express();
mongoose.connect(process.env.DBU, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Unable to connect to the database', error);
  })
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
  // Endpoint to handle user registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email });
    await User.register(newUser, password);
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('An error occurred while registering the user', error);
    res.status(500).json({ success: false, message: 'Error occurred while registering the user' });
  }
});
// Endpoint to handle user login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

// Endpoint to handle user logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
// Middleware to check if the user is authenticated
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
// Example of a protected route accessible only by authenticated users
app.get('/dashboard', isLoggedIn, (req, res) => {
  // Render the dashboard page or send any other response you want
});
// Set up EJS as the view engine
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
// Render login and register pages using EJS
app.get('/login', (req, res) => {
  res.render('login.ejs')
});
app.get('/register', (req, res) => {
  res.render('register.ejs')
});
const emailSchema = new mongoose.Schema({
  receiver: String,
});
const EmailModel = mongoose.model('Email', emailSchema);
const sendMail = (receiver) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'moussaswag5@gmail.com',
        pass: 'omxwbebucpedfgcb',
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
// Endpoint to send mail and save receiver to the database
app.post('/sendmail', async (req, res) => {
  try {
    const { receiver } = req.body;
    await sendMail(receiver);
    const newEmail = new EmailModel({ receiver });
    await newEmail.save();
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
// Endpoint to check if the email exists in the database
app.get('/sendmail', async (req, res) => {
  try {
    const receiver = req.query.receiver;
    const emails = await EmailModel.findOne({ receiver });
    if (emails) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('An error occurred while retrieving emails', err);
    res.status(500).send(err.message);
  }
});
// Endpoint to get all emails from the database
app.get('/sendmail/all', async (req, res) => {
  try {
    const emails = await EmailModel.find({});
    res.json(emails);
  } catch (err) {
    console.error('An error occurred while verifying the user', err);
    res.status(500).send(err.message);
  }
});
// MongoDB user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
// Passport setup
// ...
// Start the server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.listen(3002, () => {
  console.log('Server started on port 3002');
});