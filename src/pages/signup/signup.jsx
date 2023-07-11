import React, { useState } from 'react';
import axios from 'axios';
// spa : single page application sans reload ntn9l mn page l page tconverti ajax l json
/// pour transférer les e-mails d'un serveur à un autre.
import { useNavigate } from 'react-router-dom';
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
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3002/api/users/', {
      params: {
        email,
        password,
      },
    })
      .then((response) => {
        if (response.data.exists) {
          setMessage('User already exists. Please change email and/or password.');
        } else {
          sendMail(email); // sendmail déclarinaha au dessous existe aussi dans express.js
          navigate('/Products') 
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setEmail(''); // ${email}
    setPassword('');
  }; // fin de handelsubmit
  const sendMail = (receiver) => { // receiver conue a intérieur de sendmail au back-end dans 'to' : '' nodemailer dertelha  post f express
    axios.post('http://localhost:3002/sendmail', { receiver })
      .then(() => {
        setMessage('Thank you for your registration');
        alert('Thank you  for your registration');
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get('http://localhost:3002/sendmail', { receiver })
      .then(() => {
        setMessage('Thank you for your registration');
        alert('Thank you  for your registration');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>{message}</h1>
      <p>SignUp</p>
      <form onSubmit={handleSubmit}>
        <h1>Email:</h1>
        <input type="email" name="email" value={email} onChange={handleInputChange} />
        <h1>Password:</h1>
        <input type="password" name="password" value={password} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
