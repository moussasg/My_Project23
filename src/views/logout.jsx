import React from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      // Effectuer une requête GET au backend pour la déconnexion
      await axios.get('http://localhost:3002/logout'); // Assurez-vous que l'URL correspond à la route de déconnexion de votre backend ('/logout')
      console.log('success logout')
      // Rediriger vers la page de connexion ou toute autre page appropriée après la déconnexion
      navigate('/login'); // Remplacez '/login' par l'URL de la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };  
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Logout;
