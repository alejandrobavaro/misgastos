import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/_03-Componentes/_Sidebar.scss";
import { FiArrowRightCircle } from "react-icons/fi"; // Ícono moderno para el botón

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FiArrowRightCircle />
      </button>
      <div className="sidebar-content">
        <h2>Gastos</h2>
        <ul>
          <li><Link to="/por-pagar">Por Pagar</Link></li>
          <li><Link to="/pagados">Pagados</Link></li>
          <hr />
          <li><Link to="/totales">TOTALES</Link></li>
          <hr />
          <h2>CPE</h2>
          <ul>
            <li><Link to="/empresas">Empresas</Link></li>
            <li><Link to="/impuestos">Impuestos</Link></li>
            <li><Link to="/nuevo-cpe">Nuevo CPE</Link></li>
          </ul>
        </ul>
        <h2>Consultas</h2>
        <ul>
          <li><Link to="/vencimientos">Vencimientos</Link></li>
          <li><Link to="/comprobantes">Comprobantes</Link></li>
          <li><Link to="/facturas">Facturas</Link></li>
        </ul>
        <h2>Banco</h2>
        <ul>
          <li><Link to="/banco-saldos">Saldos</Link></li>
          <li><Link to="/cobranza">Cobranza</Link></li>
        </ul>
        <h2>Rentas</h2>
        <ul>
          <li><Link to="/alquileres">Alquileres</Link></li>
        </ul>
        <h2>Data</h2>
        <ul>
          <li><Link to="/data">Info Cuentas</Link></li>
          <hr />
        </ul>
        <h2>Tu Sesión</h2>
        <ul>
          <li><Link to="/login">Tu Usuario</Link></li>
          <li><Link to="/logout">Cerrar Sesión</Link></li>
        </ul>
        <h2>Otros</h2>
        <ul>
          <li><Link to="/ayuda">Ayuda</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
