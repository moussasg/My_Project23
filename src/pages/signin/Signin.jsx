import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logsi from "../../assets/logsi.png"
import classes from "./index.module.css"
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/users/', {
        params: { // get w7d aprés fel front aprés fel back-end dire users/all 
          email,
          password,
        },
      });
      if (response.data.exists) {
        navigate('/Products');
      } else {
        setMessage('Please sign up to access the products.');
      }
    } catch (error) {
      console.error('An error occurred while verifying the user', error);
      setMessage('Error occurred while verifying the user');
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  return (
    <div>
      <h1>{message}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.input}>
        <p>Signin</p>
        <img height='70' width='70' src={Logsi} alt='logsi'></img>
        <h5>Email:</h5>
        <input type="email" name="email" value={email} onChange={handleInputChange} />
        <h5>Password:</h5>
        <input type="password" name="password" value={password} onChange={handleInputChange} /><br/>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default SignIn;