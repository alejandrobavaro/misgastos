import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./SesionAuthContext";
import HeaderDolarApi from "./HeaderDolarApi";
import HeaderNotificaciones from "./HeaderNotificaciones";
import { useHeaderNotifications } from "./HeaderNotificacionesContext";
import AppModoClaroOscuro from "./AppModoClaroOscuro";
import {
  BsFillPersonPlusFill,
  BsBoxArrowRight,
  BsList,
  BsClock,
} from "react-icons/bs";
import { BsCalculator } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const { state, dispatch } = useAuth();
  const { notifications } = useHeaderNotifications();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo-container">
            <img
              src="/img/02-logos/logomisgastos1.png"
              alt="Logo"
              className="logoHeader"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <BsList className="menu-icon" onClick={handleToggleMobileMenu} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`${isMobileMenuOpen ? "show" : ""}`}
          >
            <Nav className="mr-auto">
              <Nav.Link
                className="nav-link home-link"
                as={Link}
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Nav.Link>

              <Nav.Link
                className="nav-link contacto-link"
                as={Link}
                to="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACTO
              </Nav.Link>

              <Link to="/MainCalculadora">
                <span className="iconoCalculadora">
                  <BsCalculator />
                </span>
              </Link>

              <Nav.Link
                className="nav-link notas-link"
                as={Link}
                to="/main-notas"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NOTAS
              </Nav.Link>
              <Nav.Link
                className="nav-link tareas-link"
                as={Link}
                to="/MainTareasEnProceso"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TAREAS
              </Nav.Link>
            </Nav>

            <Nav.Link
              className="nav-link temporizador-link"
              as={Link}
              to="/MainTemporizadorTareas"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BsClock className="iconoTemporizador" />
              <span></span>
            </Nav.Link>
            <Nav className="">
              <Nav.Item>
                <HeaderDolarApi />
              </Nav.Item>

              <Nav.Item className="notifications-item">
                <Link to="/calendario-pagos">
                  <HeaderNotificaciones reminderCount={notifications.today} />
                </Link>
              </Nav.Item>

              <Nav.Item className="dark-mode-toggle">
                <AppModoClaroOscuro
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </Nav.Item>

              <Nav.Item className="date-container">
                <div className="date-text">
                  <div className="time-row">
                    <span>
                      Son las{" "}
                      <span className="current-time">
                        {currentTime.toLocaleTimeString()}
                      </span>
                    </span>
                  </div>
                  <div className="weekday-row">
                    <span>
                      {" "}
                      del día <span className="dia">{weekday},</span>
                    </span>
                  </div>
                  <div className="date-row">
                    <span className="numeroFecha">{dayMonthYear}</span>
                  </div>
                </div>
              </Nav.Item>

              <Nav.Item className="auth-buttons-container">
                {state.isAuthenticated ? (
                  <div className="auth-welcome-container">
                    <div className="auth-welcome">
                      <span>Hola,</span>{" "}
                      <span>{state.user.email.split("@")[0]}</span>
                    </div>
                    <Link
                      className="nav-linkHeader auth-link logout-link"
                      to="/logout"
                      onClick={() => {
                        dispatch({ type: "LOGOUT" });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <BsBoxArrowRight className="auth-icon" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link className="nav-linkHeader auth-link" to="/login">
                      <BsFillPersonPlusFill className="auth-icon" />
                    </Link>
                    <hr className="auth-divider" />
                    <Link className="nav-linkHeader auth-link" to="/register">
                      Regístrate
                    </Link>
                  </>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
