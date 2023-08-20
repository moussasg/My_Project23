import React from 'react'
import ReactDOM from "react-dom/client" // il faut faire commande npm-install react-router-dom
import { BrowserRouter } from "react-router-dom" //// il faut faire commande npm add router
import App from './App'
import './index.css'
import { AuthProvider } from './autcontex' ; // Import AuthProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider> {/* Wrap your App component with AuthProvider */}
    <BrowserRouter> 
    <App />
    		{/*app ndiroh entre les browserrouter*/}	
    		{/*app ndiroh entre les browserrouter*/}	
    </BrowserRouter>
    </AuthProvider> {/* Wrap your App component with AuthProvider */}
  </React.StrictMode>,
)
