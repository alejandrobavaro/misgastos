import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./SesionAuthContext";
import HeaderDolarApi from "./HeaderDolarApi"; // Asegúrate de que el path sea correcto
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = () => {
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-column">
          <Link to="/" onClick={handleCloseMobileMenu}>
            <img
              src="/img/02-logos/logomisgastos1.png"
              alt="Logo"
              className="logoHeader"
            />
          </Link>
        </div>
        <nav className={`navbarHeader ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="navbar-navHeader">
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
            <div className="contenedor-dolarappi">
              <HeaderDolarApi /> {/* Muestra el valor del dólar aquí */}
            </div>
          </div>
        </nav>
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
                <h2 className="textoMenu">Cerrar Sesión</h2>
              </Link>
            ) : (
              <>
                <Link
                  className="nav-linkHeader"
                  to="/login"
                  onClick={handleCloseMobileMenu}
                >
                  <h3 className="textoMenu">Inicia Sesión</h3>
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
