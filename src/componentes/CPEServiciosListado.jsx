import React from 'react';
import "../assets/scss/_03-Componentes/_CPEServiciosListado.scss";

const servicios = [
  { name: 'Tarjetas de Credito', count: 3, icon: 'credit-card' },
  { name: 'Gas', count: 1, icon: 'fire' },

  { name: 'Agua', count: 1, icon: 'tint' },

  { name: 'Electricidad', count: 1, icon: 'lightbulb' },
  { name: 'Medicina Prepaga', count: 1, icon: 'stethoscope' },
  { name: 'Telefonía', count: 2, icon: 'phone' },

  { name: 'Consorcios', count: 1, icon: 'building' },
  { name: 'Otros Servicios', count: 1, icon: 'cogs' },

];

const CPEServiciosListado = () => {
  return (
    <div className="main-empresas-listado">
      {servicios.map((servicio, index) => (
        <div key={index} className="empresa-card">
          <div className="empresa-icon">
            <i className={`bi bi-${servicio.icon}`}></i>
          </div>
          <div className="empresa-info">
            <span>{servicio.name}</span>
            <span className="empresa-count">{servicio.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CPEServiciosListado;
