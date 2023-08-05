import React from 'react';
const IndexPage = ({ utilisateur }) => {
  return (
    <div>
      {utilisateur ? (
        <div>
          <h1>Bienvenue {utilisateur.email}</h1>
          <p>Vous êtes connecté en tant que {utilisateur.email}</p>
          <a href="/logout">Déconnexion</a>
        </div>
      ) : (
        <div>
          <h1>Page d'accueil</h1>
          <p>Veuillez vous connecter pour accéder à votre compte.</p>
          <a href="/login">Connexion</a>
        </div>
      )}
    </div>
  );
};
export default IndexPage;
