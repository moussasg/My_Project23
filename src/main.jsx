import React from 'react'
import ReactDOM from "react-dom/client" // il faut faire commande npm-install react-router-dom
import { BrowserRouter } from "react-router-dom" //// il faut faire commande npm add router
import App from './App'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
    		{/*app ndiroh entre les browserrouter*/}	
    <App />
    		{/*app ndiroh entre les browserrouter*/}	
    </BrowserRouter>
  </React.StrictMode>,
)
