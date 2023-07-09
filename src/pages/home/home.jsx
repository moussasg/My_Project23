import React from 'react'
import classe from "./index.module.css"
import LogoAceuill from "../../assets/logos.jpg"
import 'bootstrap/dist/js/bootstrap.js';
import Signup from "../signup/signup"
import 'bootstrap/dist/css/bootstrap.css';
import { Link , Route } from 'react-router-dom';
export default function Home() {
  return (
    <>
    <div className={classe.home}>
    <img src={LogoAceuill}></img>
    <div className={classe.but}>
 <button type="button" class="btn btn-outline-primary"> 
 <Link to="/Signup"> Sign Up</Link></button>
    </div>
    </div>
       </>
      )}
