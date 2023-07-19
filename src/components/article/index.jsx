import React, { useState } from "react";
import axios from "axios";// bibliothèque AJAX 
import classes from "./index.module.css" ;
import { useParams } from "react-router-dom" ;
import { MesSmartphones } from "../../constant/toutemarque";
import { useRef } from "react";
import Pan from "./pan.jpeg"
import Ajoutpan from "../matui/ajoutpa"
import Addicon from "../matui/addicon";
import Delbut from "../matui/delbuton.jsx"
function Card() {
  const { id } = useParams();
  const FindId = MesSmartphones.find((el) => el.id === id);
  const [selectram, setselectram] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectgb, setselectgb] = useState("");
  const [panier, setpanier] = useState([]); // panier yetruna Yta yetmonta 
  const [quantité, setquantité] = useState({}); // quantité initialisé avec objets vide elle peut contenir plusieurs propriété avec ces valeurs
  const [prix, setprix] = useState(0); // prix c total
  const ref = useRef(null);
  const moins = (produit) => { // diminuer quantité
    setquantité( (el) => { 
      const updatedQuantité = { ...el }; // je return updatedQuantité => les ancien quantité ; meme dans plus
      if (updatedQuantité[produit] > 1) { 
        updatedQuantité[produit] --; // updatedQuantité[produit] = -1 
      } else { // updatedQuantité[produit] < 1
        updatedQuantité[produit] = 1;
      } // ila kane = 1 khelih kima rah matzidche tna9asse
      return updatedQuantité;
    }
    ); //fin de setquantité
  };
  const plus = (produit) => { // augmenter quantité
    setquantité( (el) => {
      const updatedQuantité = { ...el }; // les ancien quantité
      if (updatedQuantité[produit]) {
        updatedQuantité[produit] ++;// updatedQuantité[produit] = + 1
      } else { // ila makache updati !updatedQuantité[produit] 
        updatedQuantité[produit] = 1; /// khelih wa7ed
      }
      return updatedQuantité;
    });//fin de setquantité
  };
  ///// ... = spread
  const addToCart = (xi) => {
    const updatedPanier = [...panier, { ...xi, quantité: quantité[xi.nom] || 1 }];// si j'ajoute pas quantité: {quantité[xi.nom] || 1} je peut pas extraire quantité la quantité de  nouvaux prix total et l'envoyé au backend !!!!!!!!
    setpanier(updatedPanier);
    const updatedTotalPrice = prix + xi.prix * (quantité[xi.nom] || 1);
    setprix(updatedTotalPrice);
    confirm(xi.nom + ' ' + 'ajouté avec succès');
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // pour scroler vers prix total , j'ai définie h3 ref={ref}
  /////
  const renderSmartphones = () => { // on introduit dans renderSmartphones()
    const filteredSmartphones = FindId.produits.filter((el) => {
      if (selectram && selectgb && selectedModel) {
        return el.ram === selectram && el.nom === selectedModel && el.gb === selectgb;
      } else if (selectram && selectgb) {
        return el.ram === selectram && el.gb === selectgb;
      } else if (selectram && selectedModel) {
        return el.ram === selectram && el.nom === selectedModel;
      } else if (selectedModel && selectgb) {
        return el.nom === selectedModel && el.gb === selectgb;
      } else if (selectram) {
        return el.ram === selectram;
      } else if (selectedModel) {
        return el.nom === selectedModel;
      } else if (selectgb) {
        return el.gb === selectgb;
      } else {
        return true;
      }
    });
    if (filteredSmartphones.length === 0) {
      return <h2>Il n'existe pas de modèle correspondant aux filtres sélectionnés.</h2>;
    }
    return (
      <div className={classes.tout}>
        {filteredSmartphones.map((el, i) => (
          <div key={i} className={classes.xiaomi}>
            <div className={classes.marque}>
              <h1>{el.marque}</h1>
            </div>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>
                    <h1>{el.nom}</h1> 
                    Quantité: {quantité[el.nom] || 1} {/*|| 1 pour éviter les éreur si yas un probléme sa afiche 1*/}
                    <h3> Prix: {el.prix * (quantité[el.nom] || 1)}</h3>
                    <div className={classes.plusmoinsajout}>
                    <div onClick={() => plus(el.nom)}> <Addicon/> </div>
                    <div onClick={() => moins(el.nom)}> <button>- </button></div>
                    <div onClick={() => addToCart({nom: el.nom , prix: el.prix})}>
                      {/*nas7a9e nom et prix de produits*/}
                      <Ajoutpan/>
                    </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={el.imgp} alt={el.nom} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1>{el.caractér} / {el.gb} Stockage</h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1>Prix : {el.prix}</h1>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }; /// fin de renderSmartphones
  const handeldelete = (el) => {
    const delpanier = panier.filter((xi)=> xi !== el)
    setpanier(delpanier)
    const updatedTotalPrice = prix - (el.prix * (quantité[el.nom] || 1))// prix = ancienc prix des produits + le nouv 
    setprix(updatedTotalPrice)
  }
  const confirma =  async (quantité,nom )  => {
    try {
    const response = await axios.post('http://localhost:3002/comands' ,{ quantité, nom } )
    console.log(response)
    console.log(`quantité: ${quantité}, nom: ${nom} ajouté au db`)
    }
    catch(error){
    console.log(error);
    }}
  const renderPanier = () => { // ndiroha f dernier return
    return (
      <div className={classes.panier}>
        <h2>Panier</h2>
        <img src={Pan} alt="ff"></img>
        {panier.length === 0 ? ( /// if panier.length = 0 psq drtlo tablaux videpanier vide si panier n'est pas vide
          <p> Le panier est vide. </p> // panier drtelha setpanier dakhel addtocart
        ) : ( 
          <ul> {/* si panier n'est pas vide */}
            {panier.map((xi, el1) => ( // panier jate m setpanier li dakhel addtocart
            <h1> <li key={el1} className={classes.delete}> {/*si panier n'est pas vide*/}
            <div className={classes.del}>
                {xi.nom} - Quantité: {quantité[xi.nom] || 1} - Prix: {xi.prix * (quantité[xi.nom] || 1)} - 
                  <div onClick={()=>handeldelete(xi)}> <Delbut/> 
                  <div className={classes.ach}>
                  </div>  
                  </div>
                  {panier.map((tic,tic1) => (
          <div key={tic1}>
      <button onClick={() =>confirma(tic.quantité, tic.nom)}>Acheté</button>
      </div>
        ))}
          </div>
              {/*xi psq j'ai mapé avec xi*/}
              </li> {/*|| est utilisé pour fournir une valeur par défaut lorsque la quantité d'un produit n'est pas définie ou est falsy. Cela permet d'éviter les erreurs*/}
            </h1> 
            ))}
          </ul>
        )}
        <h3 ref={ref} className={classes.prixtot}>Prix total: {prix}</h3> {/*prix = total*/}
      </div> 
    );
  }; /// fin de render panier
  return (
    <>
      <div className="filtre">
        <div className={classes.adroite}>
          <br />
        </div>
        <p>filtré par</p>
      </div>
      <select value={selectram} onChange={(e) => setselectram(e.target.value)}>
        <option value="">RAM</option>
        {[...new Set(FindId.produits.map((el) => el.ram))].map((ram) => (
          <option key={ram} value={ram}>{ram}</option>
        ))}
      </select>
      <select value={selectgb} onChange={(e) => setselectgb(e.target.value)}>
        <option value="">Stockage</option>
        {[...new Set(FindId.produits.map((el) => el.gb))].map((gb) => (
          <option key={gb} value={gb}>{gb}</option>
        ))}
      </select>
      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
        <option value="">Modèle</option>
        {[...new Set(FindId.produits.map((el) => el.nom))].map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
      {renderSmartphones()}
      {renderPanier()}
    </>
  );
} /// fin de la function Card
export default Card;

