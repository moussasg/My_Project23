import React , { useEffect, useState } from 'react'; // useEffect hook du gestion d'effect dans react 
//useEffect( callback , [dependencies] );
// callback : fonction:  bloc de code réutilisable  exécutée 'après chaque rendu' du composant.
// dependencies : [tableau] contenant 'les valeurs qui déterminent si l'effet' doit être exécuté à nouveau. Si une valeur dans le tableau change entre les rendus, l'effet sera déclenché à nouveau. Si dependencies est vide, 
//l'effet sera exécuté une seule fois après le premier rendu. ya plusieurs utilisations
import './App.css'
import { AuthProvider, useAuth } from './autcontex.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gite from "../src/assets/github.png"
import In from "./assets/in.png"
import Products from "./store/nproducts"
import { MesSmartphones } from './constant/toutemarque'; // constante de tout mon magasin
import Inscription from "./views/inscription"
import Follow from './components/matui/follow';
import Connexion from "./views/co/connexion"
import Home from  "./home/home"
import Card from './components/article/index';
import Sign from './components/matui/sig';
import Register from './components/matui/register';
import Hom from "./components/matui/home"
import Location from './components/matui/location';
import Fb from './components/matui/fb';
import Insta from './components/matui/insta';
import Tik from "./assets/tik.jpg"  
import Darker from './components/matui/darker';
import { Routes  , Route , Link } from 'react-router-dom';
import Logout from "./views/logout"
function App() {
  const { setUserToken } = useAuth(); // Utilisez le hook pour accéder au contexte
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt'); // Obtenir le token du localStorage
    if (storedToken) {
      // Mettre à jour le token dans le contexte s'il existe dans le localStorage
      setUserToken(storedToken);
    }
  }, []);
  const darkModeStyles = { // on introduit aprés le return on passant par prop
    backgroundColor: '#333',
    color: '#fff',
    // Ajoutez d'autres styles spécifiques au mode sombre ic
  };
  const normalStyles = { // on introduit aprés le return on passant par prop
    backgroundColor: '#fff',  
    color: '#333',
    // Ajoutez d'autres styles spécifiques au mode normal ici
  };
  const [darkMode, setDarkMode] = useState(false); // darkMode tkon false
  const handeldark = () => { // ki tecliki 3la handeldark 
    setDarkMode(!darkMode)  // tweli true
  }
    return (  // darkMode tkone false
<AuthProvider>
  <>
    <div className="App" style={darkMode ? darkModeStyles  : normalStyles}> {/*if darkMode true =>darkModeStyles else normalStyles */} 
        <div className="container"> {/*bootstrap  */}
        <div className="row">{/*bootstrap  */}
          <div className="col-md-12">
        <div className='cont'>
          <div className='res'>
          <h4 style={{color:"white"}}> Follow us </h4><Follow/> 
        </div>
        <a href='https://m.facebook.com/moussa.souag'>facebook <Fb /></a>
        <a href='https://instagram.com/hydra_smartphones?igshid=NTc4MTIwNjQ2YQ=='> instagram <Insta/> </a>
        <a href='https://www.tiktok.com/@hydra_smartphones'> <img className='tik' src={Tik}/> tiktok</a>
        </div>
      <nav className="nav">
        <Link to="/">Home <Hom /> </Link>
        <Link to="/login">Sign in  <Sign/></Link>
        <Link to="/signup"> Sign Up <Register/></Link>
        <div onClick={handeldark}> <h4>Dark Mode <Darker/></h4> </div>
      </nav>
      <Routes>
        <Route path='/signup' element={<Inscription />}/>
        <Route path="/login" element={<Connexion/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/logout' element={<Logout/>}/>
      <Route path='' element={<Home/>}/>
      <Route path="/MesSmartphones/:id" element={<Card data={MesSmartphones} />} />
      </Routes> 
      <div className='mapos'>
        <h2> Localisation </h2>
        <Location /> <br />
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25578.110244640386!2d3.007740294686316!3d36.74023905831581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb20a92cfe02b%3A0x5417f83e218b9393!2sHydra!5e0!3m2!1sfr!2sdz!4v1678997642374!5m2!1sfr!2sdz"
          width="800" height="150" style={{ border: "0" }}
          allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
      </div>
      </div>
     </div>
     </div>
     </div> <br/>
     <div className='footer'>
        <div><a href='https://www.linkedin.com/in/moussa-souag-2892781b5'><img height='40' width='40' src={In} alt='ff'></img></a></div>
        <div><a href='https://github.com/moussasg/myproject'><img height='40' width='40' src={Gite} alt='ff'></img></a></div>
      </div> <br/>
     <h5> © 2023 | Souag Moussa </h5>
     </>
     </AuthProvider>
  )
}
export default App
