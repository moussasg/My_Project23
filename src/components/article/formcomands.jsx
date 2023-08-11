import React , { useState } from 'react'
export default function formcomands() {
  const [nom, setnom ] = useState('');
  const [adress, setadresse] = useState('');
  const [numero, setnumero] = useState('');
  const handleChange = (event) => {
    const { name, value } = event.target; // name = nom,adress,numero 
    if (name === 'nom') setnom(value);
    if (name === 'adress') setadresse(value);
    if (name === 'numero') setnumero(value);
  };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.post('http://localhost:3002/commands', {email,password});
        console.log(response)
        if (response.data.success===true) { // il faut déclaré success dans le backedn f la réponse li trécupiriha
            confirm('votre commande est en cours de traitement ')
        }
        } catch (error) { 
            console.error('Response data:', error.response?.data);    }
      };
  return (
    <>
    <form onSubmit={handleSubmit}>
        <h5>Nom et prénom </h5>
        <input type="nom" name="nom" value={nom} onChange={handleChange} />
        <h5>adresse :</h5>
        <input type="adress" name="adress" value={adress} onChange={handleChange} />
        <h5>Numéro :</h5>
        <input type="numero" name="numero" value={numero} onChange={handleChange} />
        <button type="submit">Submit</button>
    </form>
    </>
  )
}
