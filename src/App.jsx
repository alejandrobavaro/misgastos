import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './componentes/Header';
import MainContent from './componentes/MainContent';
import ContactoLogoRedes from './componentes/ContactoLogoRedes';
import ContactoFormularioSlider from './componentes/ContactoFormularioSlider';
import PublicidadDebajo from './componentes/MainPublicidadSlider';
import Footer from './componentes/Footer';

import { AuthProvider } from './componentes/SesionAuthContext';
import Login from './componentes/SesionLogin';
import Register from './componentes/SesionRegistrate';
import Logout from './componentes/SesionLogout';

import MainWhatsappIcon from './componentes/MainWhatsappIcon';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './assets/scss/_01-General/_BodyIndexApp.scss';

import Totales from './componentes/Totales'; // Importación correcta
import Cobranza from './componentes/Cobranza';
import Data from './componentes/Data';
import Sidebar from './componentes/Sidebar';
import MainEmpresasListado from './componentes/MainEmpresasListado';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <AuthProvider>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <hr className="border border-0 opacity-20" />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/contacto" element={<><ContactoLogoRedes /><ContactoFormularioSlider /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/totales" element={<Totales />} /> {/* Ruta para Totales */}
              <Route path="/cobranza" element={<Cobranza />} />
              <Route path="/data" element={<Data />} />
              <Route path="/empresas" element={<MainEmpresasListado />} />
            </Routes>
          </div>
        </div>
        <hr className="border border-0 opacity-20" />
        <PublicidadDebajo />
        <Footer />
        <MainWhatsappIcon />
      </AuthProvider>
    </Router>
  );
}

export default App;
