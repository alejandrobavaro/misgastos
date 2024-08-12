import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import MainContent from './componentes/MainContent';
import ContactoLogoRedes from './componentes/ContactoLogoRedes';
import ContactoFormularioSlider from './componentes/ContactoFormularioSlider';
import PublicidadDebajo from './componentes/MainPublicidadSlider';
import Footer from './componentes/Footer';
import { AuthProvider, useAuth } from './componentes/SesionAuthContext';
import Login from './componentes/SesionLogin';
import Register from './componentes/SesionRegistrate';
import Logout from './componentes/SesionLogout';
import MainWhatsappIcon from './componentes/MainWhatsappIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/scss/_01-General/_BodyIndexApp.scss';

import MisGastosPagados from './componentes/MisGastosPagados';
import MisGastosPorPagar from './componentes/MisGastosPorPagar';
import ServiciosEmpresasListado from './componentes/CPEServiciosListado';
import ConsultasVencimientos from './componentes/ConsultasVencimientos';
import ConsultasComprobantes from './componentes/ConsultasComprobantes';
import ConsultasAyuda from './componentes/ConsultasAyuda';
import Totales from './componentes/Totales';
import Cobranza from './componentes/Cobranza';
import Data from './componentes/Data';
import BancoSaldosDisponibles from './componentes/BancoSaldosDisponibles';
import CPECargarNuevoCPE from './componentes/CPECargarNuevoCPE';
import CPEImpuestosListado from './componentes/CPEImpuestosListado';
import { HeaderNotificationsProvider } from './componentes/HeaderNotificacionesContext'; 

const ProtectedRoute = ({ element, ...rest }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AuthProvider>
      <HeaderNotificationsProvider>
        <Router>
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> {/* Pasa props al Header */}
          <hr className="border border-0 opacity-20" />
          <div className={`main-content ${isDarkMode ? 'dark-mode' : ''}`}>
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<ProtectedRoute element={<MainContent />} />} />
                <Route path="/contacto" element={<ProtectedRoute element={<><ContactoLogoRedes /><ContactoFormularioSlider /></>} />} />
                <Route path="/totales" element={<ProtectedRoute element={<Totales />} />} />
                <Route path="/cobranza" element={<ProtectedRoute element={<Cobranza />} />} />
                <Route path="/data" element={<ProtectedRoute element={<Data />} />} />
                <Route path="/por-pagar" element={<ProtectedRoute element={<MisGastosPorPagar />} />} />
                <Route path="/pagados" element={<ProtectedRoute element={<MisGastosPagados />} />} />
                <Route path="/servicios" element={<ProtectedRoute element={<ServiciosEmpresasListado />} />} />
                <Route path="/impuestos" element={<ProtectedRoute element={<CPEImpuestosListado />} />} />
                <Route path="/nuevo-cpe" element={<ProtectedRoute element={<CPECargarNuevoCPE />} />} />
                <Route path="/vencimientos" element={<ProtectedRoute element={<ConsultasVencimientos />} />} />
                <Route path="/comprobantes" element={<ProtectedRoute element={<ConsultasComprobantes />} />} />
                <Route path="/ayuda" element={<ProtectedRoute element={<ConsultasAyuda />} />} />
                <Route path="/banco-saldos" element={<ProtectedRoute element={<BancoSaldosDisponibles />} />} />
              </Routes>
            </div>
          </div>
          <hr className="border border-0 opacity-20" />
          <PublicidadDebajo />
          <Footer />
          <MainWhatsappIcon />
        </Router>
      </HeaderNotificationsProvider>
    </AuthProvider>
  );
}

export default App;
