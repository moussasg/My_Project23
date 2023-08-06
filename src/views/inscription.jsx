import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UserForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await axios.post('http://localhost:3001/signup', {email,password});
    console.log(response)
    if (response.data.success===true) { // il faut déclaré success dans le backedn f la réponse li trécupiriha
        navigate('/login')
    }
    } catch (error) {
        console.error('Response data:', error.response?.data);    }
  };
  return (
    <div>
      <p>SignUp</p>
      <form onSubmit={handleSubmit}>
        <h1>Email : </h1>
        <input type="email" name="email" value={email} onChange={handleChange} />
        <h1>Password :</h1>
        <input type="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
