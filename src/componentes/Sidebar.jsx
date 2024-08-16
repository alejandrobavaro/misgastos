import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/_03-Componentes/_Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Gastos</h2>
      <ul>
        <li>
          <Link to="/por-pagar">Por Pagar</Link>
        </li>
        <li>
          <Link to="/pagados">Pagados</Link>
        </li>
        <hr />
        <li>
          <Link to="/totales">TOTALES</Link>
        </li>
        <hr />
        <h2>CPE</h2>
        <ul>
          <li>
            <Link to="/empresas">Empresas</Link>
          </li>
          <li>
            <Link to="/impuestos">Impuestos</Link>
          </li>
          <li>
            <Link to="/nuevo-cpe">Nuevo CPE</Link>
          </li>
        </ul>
      
      </ul>
      <h2>Consultas</h2>
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
      <h2>Banco</h2>
      <ul>
        <li>
          <Link to="/banco-saldos">Saldos</Link>
        </li>
        <li>
          <Link to="/cobranza">Cobranza</Link>
        </li>
      
      </ul>


      <h2>Rentas</h2>
      <ul>
        <li>
          <Link to="/alquileres">Alquileres</Link>
        </li>
      </ul>

      <h2>Data</h2>
      <ul>
        <li>
          <Link to="/data">Info Cuentas</Link>
        </li>
        <hr />
      </ul>
      <h2>Tu Sesión</h2>
      <ul>
        <li>
        <h2>VER</h2>
          <Link to="/login">Tu Usuario</Link>
        </li>
        <li>
          <Link to="/logout">Cerrar Sesión</Link>
        </li>

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
