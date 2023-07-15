import React from "react";
import classes from "./index.module.css";
import { Link } from "react-router-dom";
import { MesSmartphones } from "../../constant/toutemarque";
function Nproducts() {
  return (
    <div className={classes.container}>
      {MesSmartphones.map((el, i) => (
        <div className={classes.cardContainer} key={i}>
          <Link to={`/MesSmartphones/${el.id}`}>
            <img src={el.image} alt={el.name} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Nproducts;
