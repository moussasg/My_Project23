import React, { useState } from "react";
import classes from "./index.module.css";
import { useParams } from "react-router-dom";
import { MesSmartphones } from "../../constant/toutemarque";
import Pan from "./pan.jpeg"
function Card() {
  const { id } = useParams();
  const FindId = MesSmartphones.find((el) => el.id.toString() === id);
  const [selectram, setselectram] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectgb, setselectgb] = useState("");
  const [panier, setpanier] = useState([]);
  const [quantité, setquantité] = useState({});
  const [prix, setprix] = useState(0);

  const moins = (productName) => {
    setquantité((prevQuantité) => {
      const updatedQuantité = { ...prevQuantité };
      if (updatedQuantité[productName] > 1) {
        updatedQuantité[productName] -= 1;
      } else {
        updatedQuantité[productName] = 1;
      }
      return updatedQuantité;
    });
  };

  const plus = (productName) => {
    setquantité((prevQuantité) => {
      const updatedQuantité = { ...prevQuantité };
      if (updatedQuantité[productName]) {
        updatedQuantité[productName] += 1;
      } else {
        updatedQuantité[productName] = 1;
      }
      return updatedQuantité;
    });
  };

  const addToCart = (product) => {
    const updatedPanier = [...panier, product];
    setpanier(updatedPanier);
    const updatedTotalPrice = prix + product.prix * (quantité[product.nom] || 1);
    setprix(updatedTotalPrice);
  };

  const renderSmartphones = () => {
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
                    Quantité: {quantité[el.nom] || 1}
                    <h3> Prix: {el.prix * (quantité[el.nom] || 1)}</h3>
                    <button onClick={() => plus(el.nom)}>+</button>
                    <button onClick={() => moins(el.nom)}>-</button>
                    <button onClick={() => addToCart({ nom: el.nom, prix: el.prix })}>
                      Ajouter au panier
                    </button>
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
  };

  const renderPanier = () => {
    return (
      <div className={classes.panier}>
        <h2>Panier</h2>
        <img src={Pan} alt="ff"></img>
        {panier.length === 0 ? (
          <p>Le panier est vide.</p>
        ) : (
          <ul>
            {panier.map((product, index) => (
            <h1> <li key={index}>
                {product.nom} - Quantité: {quantité[product.nom] || 1} - Prix: {product.prix * (quantité[product.nom] || 1)}
              </li>
              </h1> 
            ))}
          </ul>
        )}
        <h3>Prix total: {prix}</h3>
      </div>
    );
  };

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
}

export default Card;
