import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3002/api/users/', {
        params: {
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
        <p>Signin</p>
        <h1>Email:</h1>
        <input type="email" name="email" value={email} onChange={handleInputChange} />
        <h1>Password:</h1>
        <input type="password" name="password" value={password} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default SignIn;