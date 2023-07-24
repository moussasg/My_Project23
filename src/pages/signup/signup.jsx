import React, { useState } from 'react';
import axios from 'axios';
import classes from "./index.module.css"
// spa : single page application sans reload ntn9l mn page l page tconverti ajax l json
/// pour transférer les e-mails d'un serveur à un autre.
import { useNavigate } from 'react-router-dom';
import { Alarm } from '@mui/icons-material';
const UserForm = () => {
  const navigate = useNavigate(); /// trés trés trés importants
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if the user exists
      const checkUserResponse = await axios.post('http://localhost:3002/sendmail', { receiver: email });
      if (checkUserResponse.data.exists) {
        setMessage("User already registered in the database. Please use a different email or password.");
      } else {
        // Register the user
        await axios.post('http://localhost:3002/register', { email, password });
        // Send mail after registration
        sendMail(email);
        // Navigate to the products page after successful registration
        navigate('/Products');
      }
    } catch (error) {
      console.error("An error occurred while verifying the user", error);
      setMessage("Error occurred while verifying the user");
    }
    setEmail('');
    setPassword('');
  };
  
  const sendMail = (receiver) => { // receiver conue a intérieur de sendmail au back-end dans 'to' : '' nodemailer dertelha  post f express
    axios.post('http://localhost:3002/sendmail', { receiver })
      .then(() => {
        setMessage('Thank you for your registration');
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get('http://localhost:3002/sendmail', { receiver }) // get pour all ou spécifique il suffit dire w7d et fel back dire all w7do
      .then(() => {
        setMessage('Thank you for your registration');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>{message}</h1>
      <p>SignUp</p>
      <br/>
      <form onSubmit={handleSubmit}>
        <div className={classes.input}>
        <h1>Email:</h1>
        <input type="email" name="email" value={email} onChange={handleInputChange} />
        <h1>Password:</h1>
        <input type="password" name="password" value={password} onChange={handleInputChange} />
        </div> <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
