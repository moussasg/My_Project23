import React, { useEffect } from "react";
import classes from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MesSmartphones } from "../constant/toutemarque";
import Logout from "../views/logout";
import { useAuth } from "../autcontex";
function Nproducts() {
  const navigate = useNavigate()
  const { userToken } = useAuth()
  useEffect(()=> {
  if (!userToken) {
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    navigate('/login')
  } }, []);
  return (
    <div>
        <>
        <Logout/>
        <h1>All Our Brands</h1>
          <div className={classes.deconex}>
          </div>
          <div className={classes.container}>
            {MesSmartphones.map((el, i) => (
              <div className={classes.cardContainer} key={i}>
            <Link to={`/MesSmartphones/${el.id}`}>
<img src={el.image} style={{ width: '100%', height: 'auto' }} alt={el.name} /> {/* trés simportant pour que image reste a 100%*/}
            </Link>
              </div>
            ))}
          </div>
        </>
    </div>
  );
}
export default Nproducts;
