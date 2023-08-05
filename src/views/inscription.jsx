import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    try {
      const response = await axios.post('/signup', { email, password });
      const data = response.data;
      console.log(data);
      if (data.errors) {
        if (data.errors.email) {
          setEmailError(data.errors.email);
        }
        if (data.errors.password) {
          setPasswordError(data.errors.password);
        }
        throw new Error('Validation error(s) occurred.');
      }
      if (data.user) {
        navigate('/login');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('Axios error:', err.response.data);
        throw new Error('Error occurred while processing the request.');
      } else {
        console.log('Generic error:', err);
        throw new Error('An unexpected error occurred.');
      }
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form action="/signup" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="email error">{emailError}</div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="password error">{passwordError}</div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
export default Signup;
