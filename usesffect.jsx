//useEffect est un hook de 'gestion des effets' dans React.
  // permet 'd'exécuter du code' """après le rendu d'un composant""" fonctionnel et de gérer les mises à jour ou le démontage de ce composant.
  //useEffect(callback , [dependencies]);
  // callback : fonction exécutée 'après chaque rendu' du composant.
  // dependencies : tableau contenant 'les valeurs qui déterminent si l'effet' doit être exécuté à nouveau. Si une valeur dans le tableau change entre les rendus, l'effet sera déclenché à nouveau. Si dependencies est vide, 
//l'effet sera exécuté une seule fois après le premier rendu. ya plusieurs utilisationss
import React, { useEffect } from 'react';
function MyComponent() {
  useEffect(() => {
    console.log('Le composant a été rendu');
  }, []);// 1)l'effet ne sera exécuté qu'une seule fois après le premier rendu.
  return (
    <div>
      <h1>Mon Composant</h1>
    </div>
  );
}
export default MyComponent
/* useEffect(() => {
}, [value1, value2]);
/*
import React, { useEffect, useState } from 'react';
function MyComponent() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  useEffect(() => {
    console.log('Les valeurs ont changé :', value1, value2);
  }, [value1, value2]);// Code à exécuter lorsque value1 ou value2 change
  return (
    <div>
      <input type="text" value={value1} onChange={(e) => setValue1(e.target.value)} />
      <input type="text" value={value2} onChange={(e) => setValue2(e.target.value)} />
    </div>
  );
}
export default MyComponent
*/

