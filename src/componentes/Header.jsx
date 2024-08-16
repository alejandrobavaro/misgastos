import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./SesionAuthContext";
import HeaderDolarApi from "./HeaderDolarApi";
import HeaderNotificaciones from "./HeaderNotificaciones";
import { useHeaderNotifications } from "./HeaderNotificacionesContext";
import AppModoClaroOscuro from "./AppModoClaroOscuro";
import "../assets/scss/_03-Componentes/_Header.scss";
import {
  BsFillPersonPlusFill,
  BsBoxArrowRight,
  BsSearch,
} from "react-icons/bs";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Usar el contexto de notificaciones
  const { notifications } = useHeaderNotifications();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode); // Aplicar la clase al body para todo el documento
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
              <h2 className="textoMenu">HOME</h2>
            </Link>

            <Link
              className="nav-linkHeader"
              to="/main-notas"
              onClick={handleCloseMobileMenu}
            >
              <h3 className="textoMenuTareas">NOTAS</h3>
            </Link>

            <Link
              className="nav-linkHeader"
              to="/contacto"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu1">CONTACTO</h2>
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

        <Link
          to="/"
          className="campana nav-linkHeader"
          onClick={handleCloseMobileMenu}
        >
          <HeaderNotificaciones reminderCount={notifications.today} />
        </Link>

        <Link
          className="nav-linkHeader"
          to="/MainTareasEnProceso"
          onClick={handleCloseMobileMenu}
        >
          <h6 className="textoMenuTareas">TAREAS EN PROCESO</h6>
        </Link>

        <div className="theme-switcher-container separadorR">
          <div>
            <Link to="/HeaderSearchBar" className="search-icon-link">
              <BsSearch className="search-icon" />
            </Link>
          </div>
          <div className="separadorL">
            <AppModoClaroOscuro
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
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
