import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./SesionAuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/scss/_03-Componentes/_Header.scss";

// Aquí definimos el componente Header
const Header = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para alternar el menú móvil
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Función para cerrar el menú móvil
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Determinamos si se debe mostrar la barra de búsqueda
  const shouldShowSearchBar =
    location.pathname === "/tienda" || location.pathname === "/musica";

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
              to="/totales" // Enlace actualizado
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu">TOTALES</h2>
            </Link>
            <Link
              className="nav-linkHeader"
              to="/cobranza"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu">COBRANZA</h2>
            </Link>
            <Link
              className="nav-linkHeader"
              to="/data"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu">DATA</h2>
            </Link>
            <Link
              className="nav-linkHeader"
              to="/contacto"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu">CONTACTO</h2>
            </Link>
          </div>
        </nav>
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
    </header>
  );
};

export default Header;
