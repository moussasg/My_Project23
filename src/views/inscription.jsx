import React, { useState } from 'react';
import axios from 'axios';
import logsi from "../assets/logsi.png"
import { useNavigate } from 'react-router-dom';
import classe from "./ins.module.css"
import { useAuth } from '../autcontex';
function UserForm() {
  const navigate = useNavigate()
  const { setUserToken } = useAuth(); // Destructure setUserToken from AuthContext
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
    const response = await axios.post('http://192.168.1.14:3002/signup', {email,password});
    console.log(response)
    if (response.data.success===true) { // il faut déclaré success dans le backedn f la réponse li trécupiriha
      const token = response.data.token; // 'jwt' le clé de stockage
      localStorage.setItem('jwt',token); // Save the token in localStorage
      setUserToken(token);
      navigate('/login')
    }
    } catch (error) { 
        console.error('Response data:', error.response?.data);    }
  };
  return (
    <>
      <h3>SignUp</h3>
      <form onSubmit={handleSubmit}>
      <img height='70' width='70' src={logsi} alt='logsi'></img>
      <div className={classe.inscr}>
        <h5>Email : </h5>
        <input type="email" name="email" value={email} onChange={handleChange} />
        <h5>Password :</h5>
        <input type="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Submit</button>
       </div>
       </form>
       </>
  );
}

export default UserForm;
