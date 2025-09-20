import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from "react-router-dom";
console.log("React app starting..."); 
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <HashRouter basename="/template-design"> 
    <App />
    </HashRouter> 
  </StrictMode>,
)
