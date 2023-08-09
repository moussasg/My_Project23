import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from "./index.module.css"
import logsi from "../../assets/logsi.png"
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/login', { email, password });
      if (response.data.success === true) {
      navigate('/products'); // Call handleLogin after successful login
      }
    } catch (err) {
      console.log('Fetch error:', err);
    }
  };
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
      <img height='70' width='70' src={logsi} alt='logsi'></img>
      <div className={classes.conex}>
        <h5>Email:</h5>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <h5>Password:</h5>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
       </div>
      </form>
    </div>
  );
}
export default Login;
