import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
//redux + complexe que creatcontext = createcontext est une 'fonction' React qui permet de créer un 'contexte',
//un moyen de share data entre des composants sans avoir à passer ces données de parent en enfant via les props. 
//partager des données au sein des composants diférents que redux en terme de props
//Redux est une bibliothèque de gestion d'état qui offre un store centralisé 
//pour stocker l'état global de l'application, permettant aux composants d'accéder
//de mettre à jour l'état sans avoir besoin de passer des props + le suivi des changements
export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
} // Close the AuthProvider component here
export function useAuth() {
  return useContext(AuthContext);
}
