import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.DBU, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Unable to connect to the database', error);
  });
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
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
const emailSchema = new mongoose.Schema({
  receiver: String,
});
const EmailModel = mongoose.model('Email', emailSchema);
app.post('/sendmail', async (req, res) => {
  try {
    const { receiver } = req.body;
    await sendMail(receiver);
    const newEmail = new EmailModel({ receiver });
    await newEmail.save();
    res.send('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
app.get('/sendmail', async (req, res) => {
  try {
    const emails = await EmailModel.find();
    res.json(emails);
  } catch (error) {
    console.error('An error occurred while retrieving emails', error);
    res.status(500).send(error.message);
  }
})
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
    const { email, password } = req.query; // Retrieve email and password from the query parameters
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(3002, () => {
  console.log('Server started on port 3002');
});
