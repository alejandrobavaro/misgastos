import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./SesionAuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const shouldShowSearchBar =
    location.pathname === "/tienda" || location.pathname === "/musica";

  return (
    <header className="header">
      <div className="containerHeader">
        <div className="header-topHeader">
          <div className="logo-and-search">
            <img
              src="/img/02-logos/logomisgastos1.png"
              alt="Logo"
              className="logoHeader"
            />
            <div className="search-bar-containerHeader">
              {shouldShowSearchBar && (
                <>
                  <input
                    type="text"
                    placeholder={
                      location.pathname === "/tienda"
                        ? "Buscar productos"
                        : "Buscar canciones"
                    }
                    className="search-barHeader"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="search-buttonHeader d-md-none">
                    <i className="bi bi-search"></i>
                  </button>
                </>
              )}
            </div>
            <div className="auth-buttons-container-destop">
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
          <button
            className="navbar-togglerHeader"
            type="button"
            aria-label="Toggle navigation"
            onClick={handleToggleMobileMenu}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
        <nav className={`navbarHeader ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="navbar-navHeader">
            <Link
              className="nav-linkHeader"
              to="/"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu1">HOME</h2>
            </Link>
            <Link
              className="nav-linkHeader"
              to="/musica"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu">GASTOS</h2>
            </Link>
            <Link
              className="nav-linkHeader"
              to="/tienda"
              onClick={handleCloseMobileMenu}
            >
              <h2 className="textoMenu">COBRANZA</h2>
            </Link>
            <Link
              className="nav-linkHeader"
              to="/tienda"
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
      </div>
    </header>
  );
};

export default Header;
