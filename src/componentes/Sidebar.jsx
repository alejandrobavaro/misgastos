import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/_03-Componentes/_Sidebar.scss";
import {
  FiArrowLeftCircle,
  FiDollarSign,
  FiPackage,
  FiBriefcase,
  FiBarChart2,
  FiPieChart,
  FiDatabase,
  FiCreditCard,
  FiLogIn,
  FiHelpCircle,
} from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Ejecuta la función en la carga inicial
    window.addEventListener("resize", handleResize); // Añade el event listener para cambios de tamaño de pantalla

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FiArrowLeftCircle />
      </button>
      <div className="sidebar-content">
        <h2>
          <FiBriefcase size={20} color="gray" /> Gastos
        </h2>
        <ul>
          <li>
            <Link to="/por-pagar">Por Pagar</Link>
          </li>
          <li>
            <Link to="/pagados">Pagados</Link>
          </li>
          <hr />
          <li>
            <Link to="/totales">
            <FiBarChart2 size={20} color="gray" />
                          TOTALES
            </Link>
          </li>
          <hr />
        </ul>

        <h2>
          <FiCreditCard size={20} color="gray" /> Data
        </h2>
        <ul>
          <li>
            <Link to="/data">Info Cuentas</Link>
          </li>
          <hr />
        </ul>

        <h2>
          <FiPieChart size={20} color="gray" /> CPE
        </h2>
        <ul>
          <li>
            <Link to="/servicios">Servicios</Link>
          </li>
          <li>
            <Link to="/impuestos">Impuestos</Link>
          </li>
          <li>
            <Link to="/nuevo-cpe">Nuevo CPE</Link>
          </li>
        </ul>

        <h2>
        <FiPackage size={20} color="gray" /> Consultas
        </h2>
        <ul>
          <li>
            <Link to="/vencimientos">Vencimientos</Link>
          </li>
          <li>
            <Link to="/comprobantes">Comprobantes</Link>
          </li>
          <li>
            <Link to="/facturas">Facturas</Link>
          </li>
        </ul>

       

        <h2>
          <FiBriefcase size={20} color="gray" /> Rentas
        </h2>
        <ul>
          <li>
            <Link to="/alquileres">Alquileres</Link>
          </li>
          <li>
            <Link to="/rentas-cobranza">Cobranza</Link>
          </li>

          <li>
            <Link to="/rentas-info-extra">Info Extra</Link>
          </li>
       
        </ul>

        <h2>
          <FiDollarSign size={20} color="gray" /> Banco
        </h2>
        <ul>
          <li>
            <Link to="/banco-saldos">Saldos</Link>
          </li>
                </ul>

        <h2>
          <FiLogIn size={20} color="gray" /> Tu Sesión
        </h2>
        <ul>
          <li>
            <Link to="/login">Tu Usuario</Link>
          </li>
          <li>
            <Link to="/logout">Cerrar Sesión</Link>
          </li>
        </ul>

        <h2>
          <FiHelpCircle size={20} color="gray" /> Otros
        </h2>
        <ul>
          <li>
            <Link to="/ayuda">Ayuda</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
