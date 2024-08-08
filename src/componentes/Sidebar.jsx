import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/_03-Componentes/_Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Mis Gastos</h2>
      <ul>
        <li>
          <Link to="/por-pagar">Por Pagar</Link>
        </li>
        <li>
          <Link to="/pagados">Pagados</Link>
        </li>
        <hr />
        <h2>Servicios</h2>
        <ul>
          <li>
            <Link to="/empresas">Empresas</Link>
          </li>
        </ul>
        <hr />
      </ul>
      <h2>Consultas</h2>
      <ul>
        <li>
          <Link to="/vencimientos">Vencimientos</Link>
        </li>
        <li>
          <Link to="/comprobantes">Comprobantes</Link>
        </li>
       
        <hr />
      </ul>
      <h2>Banco</h2>
      <ul>
        <li>
          <Link to="/banco-saldos">Saldos Disponibles</Link>{" "}
          {/* Enlace corregido */}
        </li>
        <li>
          <Link to="/cobranza">Cobranza</Link>
        </li>
        <li>
          <Link to="/totales">Totales</Link> {/* Enlace añadido */}
        </li>
      </ul>
      <hr />
      <h2>Data</h2>
      <ul>
        <li>
          <Link to="/data">Info de Cuentas</Link>
        </li>
        <hr />
      </ul>
      <h2>Tu Sesión</h2>
      <ul>
        <li>
          <Link to="/login">Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/logout">Cerrar Sesión</Link>
        </li>
        <hr />
      </ul>
      <h2>Otros</h2>
      <ul>
      <li>
          <Link to="/ayuda">Ayuda</Link>
        </li>
        </ul>
    </div>
  );
};

export default Sidebar;
