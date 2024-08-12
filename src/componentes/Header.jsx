import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./SesionAuthContext";
import HeaderDolarApi from "./HeaderDolarApi";
import HeaderNotificaciones from "./HeaderNotificaciones";
import { useHeaderNotifications } from "./HeaderNotificacionesContext";
import AppModoClaroOscuro from './AppModoClaroOscuro'; // Importa el componente
import "../assets/scss/_03-Componentes/_Header.scss";
import { BsFillPersonPlusFill, BsBoxArrowRight } from 'react-icons/bs'; // Importa iconos de Bootstrap

const Header = () => {
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark-mode')); // Obtener el modo actual desde el body
  
  // Usar el contexto de notificaciones
  const { notifications } = useHeaderNotifications();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode); // Aplicar la clase al body para todo el documento
  }, [isDarkMode]);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getFormattedDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = today.toLocaleDateString("es-ES", options);
    const [weekday, dayMonthYear] = formattedDate.split(", ");
    return { weekday, dayMonthYear };
  };

  const { weekday, dayMonthYear } = getFormattedDate();

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <header className="header">
      <div className="header-grid">
        <div className="logo-column">
          <Link to="/" onClick={handleCloseMobileMenu}>
            <img
              src="/img/02-logos/logomisgastos1.png"
              alt="Logo"
              className="logoHeader"
            />
          </Link>
        </div>

        <div className="navbarHeader">
          <nav className={`navbar-navHeader ${isMobileMenuOpen ? "open" : ""}`}>
            <Link
              className="nav-linkHeader home-link"
              to="/"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu1">HOME</h2>
            </Link>
            <Link
              className="nav-linkHeader"
              to="/contacto"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu">CONTACTO</h2>
            </Link>
          </nav>
        </div>

        <div className="date-container">
          <div className="date-text">
            <span>Hoy es: </span>
            <span>{weekday},</span>
            <br />
            <span>{dayMonthYear}</span>
          </div>
        </div>

        <div className="contenedor-dolarappi">
          <HeaderDolarApi />
        </div>

        

        <div className="notifications-container">
          <HeaderNotificaciones
            reminderCount={notifications.today}
            onClick={() => console.log('Notificaciones clickeadas')}
          />
        </div>


        <div className="theme-switcher-container">
          <AppModoClaroOscuro isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <div className="auth-buttons-container">
          <div className="auth-buttons-column">
            {state.isAuthenticated ? (
              <Link
                className="nav-linkHeader"
                to="/logout"
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                  handleCloseMobileMenu();
                }}
              >
                <BsBoxArrowRight className="auth-icon" />
              </Link>
            ) : (
              <>
                <Link
                  className="nav-linkHeader"
                  to="/login"
                  onClick={handleCloseMobileMenu}
                >
                  <BsFillPersonPlusFill className="auth-icon" />
                </Link>
                <hr className="auth-divider" />
                <Link
                  className="nav-linkHeader"
                  to="/register"
                  onClick={handleCloseMobileMenu}
                >
                  <h3 className="textoMenu2">Regístrate</h3>
                </Link>
              </>
            )}
          </div>
        </div>


      </div>
    </header>
  );
};

export default Header;
