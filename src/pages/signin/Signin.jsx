import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from "./module.style.css"
function SignIn() {
  const navigate = useNavigate();
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
      const checkUserResponse = await axios.get('http://localhost:3002/register', {
        params: { receiver: email },
      });
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
  return (
    <div>
      <h1>{message}</h1>
      <form onSubmit={handleSubmit}>
        <p>Signin</p> <br/>
        <div className={classes.input}>
        <h1>Email:</h1>
        <input type="email" name="email" value={email} onChange={handleInputChange} />
        <h1>Password:</h1>
        <input type="password" name="password" value={password} onChange={handleInputChange}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default SignIn;
