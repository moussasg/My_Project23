import React from 'react';
import './App.css';
import { MesSmartphones } from './constant/toutemarque'; // constante de tout mon magasin
import Signup from "./pages/signup/signup"
import Signin from './pages/signin/Signin';
import Home from './pages/home/home';
import { Link, Route, Routes } from 'react-router-dom';
import Products from './pages/store/nproducts';
import Card from './components/article/index';
import Sign from './components/matui/sig';
import Register from './components/matui/register';
import Prod from './components/matui/prod';
import Hom from "./components/matui/home"
import Location from './components/matui/location';
import Fb from './components/matui/fb';
import logohydra from '../src/assets/hydra smartphones.jpg';
function App() {
  return (
    <>
      <div className='res'>
        <div className='cont'>
          <h4> Contacté Nous sur : </h4>
        </div>
        <a href='https://m.facebook.com/moussa.souag'>facebook <Fb /></a>
        <a href='https://instagram.com/hydra_smartphones?igshid=NTc4MTIwNjQ2YQ=='> instagram</a>
        <a href='https://www.tiktok.com/@hydra_smartphones'> tiktok</a>
      </div>
      <nav className="nav">
        <Link to="/">Home <Hom /> </Link>
        <Link to="/Products">Products <Prod /> </Link>
        <Link to="/Signin">Sign in <Sign /> </Link>
        <Link to="/Signup"> Sign Up <Register /> </Link>
      </nav>
      <Routes>
        <Route path='/Signup' element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/MesSmartphones/:id" element={<Card data={MesSmartphones} />} />
      </Routes>
      <div className='mapos'>
        <h2> Localisation </h2>
        <Location /> <br />
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25578.110244640386!2d3.007740294686316!3d36.74023905831581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb20a92cfe02b%3A0x5417f83e218b9393!2sHydra!5e0!3m2!1sfr!2sdz!4v1678997642374!5m2!1sfr!2sdz"
          width="800" height="150" style={{ border: "0" }}
          allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <h4> - - -  All rights reserved - - -  </h4>
    </>
  )
}
export default App;
