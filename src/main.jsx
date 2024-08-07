import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './assets/scss/estilo.scss';

// `React.StrictMode` es una herramienta para detectar problemas potenciales en la aplicación. 
// No afecta el comportamiento en producción.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

