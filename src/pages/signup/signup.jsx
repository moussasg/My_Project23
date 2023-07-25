import React, { useState } from 'react';
import axios from 'axios';
// spa : single page application sans reload ntn9l mn page l page tconverti ajax l json
/// pour transférer les e-mails d'un serveur à un autre.
import { useNavigate } from 'react-router-dom';
import { Alarm } from '@mui/icons-material';
import classes from "./index.module.css"
import Logsi from "../../assets/logsi.png"
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
  const handleSubmit = async (event) => { // async trés trés important
    event.preventDefault();
    try { // 1/try{} , 2/catch(error){}
      const response = await axios.get('http://localhost:3001/api/users/', { // get psq signin , nvérifi si'il existe
        params:{ // params fixe prédifinie de react  je vais essayer de les mettre aprés virgule au dessus
          email,
          password,
        },
      }); // fin de requete gette
      if (response.data.exists) {
        setMessage("user déjas inscrit dans database , change email ou password");
      }
      else { // si user n'existe pas 
        await axios.post('http://localhost:3001/api/users/ ', {email , password})
        console.log('user insert in db')
        sendMail(email)/// jenvoi mail par node
        navigate('/Products') // inscription réussite aller vers produits
      }
    } // fin de try
     catch (error) {
      console.error("Une erreur s'est produite lors de la vérification de l'utilisateur", error);
      setMessage("Erreur lors de la vérification de l'utilisateur");
    }
    setEmail(''); // ${email}
    setPassword('');
  }; // fin de handelsubmit
  const sendMail = (receiver) => { // receiver conue a intérieur de sendmail au back-end dans 'to' : '' nodemailer dertelha  post f express
    axios.post('http://localhost:3001/sendmail', { receiver })
      .then(() => {
        setMessage('Thank you for your registration');
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get('http://localhost:3001/sendmail', { receiver }) // get pour all ou spécifique il suffit dire w7d et fel back dire all w7do
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
      <form onSubmit={handleSubmit}>
      <img height='70' width='70' src={Logsi} alt='logsi'></img>
      <div className={classes.input}>
        <h5>Email:</h5>
        <input type="email" name="email" value={email} onChange={handleInputChange} />
        <h5>Password:</h5>
        <input type="password" name="password" value={password} onChange={handleInputChange} />
        <br/>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default UserForm;