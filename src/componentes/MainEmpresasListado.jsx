import React from 'react';
import "../assets/scss/_03-Componentes/_MainEmpresasListado.scss";

const empresas = [
  { name: 'Tarjetas de Credito', count: 3, icon: 'credit-card' },
  { name: 'Gas', count: 1, icon: 'fire' },
  { name: 'Impuestos Municipales', count: 1, icon: 'building' },
  { name: 'Agua', count: 1, icon: 'tint' },
  { name: 'Patentes', count: 1, icon: 'car' },
  { name: 'Electricidad', count: 1, icon: 'lightbulb' },
  { name: 'Medicina Prepaga', count: 1, icon: 'stethoscope' },
  { name: 'Telefonía', count: 2, icon: 'phone' },
  { name: 'Impuestos Provinciales', count: 2, icon: 'landmark' },
  { name: 'Consorcios', count: 1, icon: 'building' },
  { name: 'Otros Servicios', count: 1, icon: 'cogs' },
  { name: 'Impuestos AFIP (VEP)', count: 1, icon: 'file-invoice-dollar' },
  { name: 'Bienes Personales', count: 1, icon: 'home' },
];

const MainEmpresasListado = () => {
  return (
    <div className="main-empresas-listado">
      {empresas.map((empresa, index) => (
        <div key={index} className="empresa-card">
          <div className="empresa-icon">
            <i className={`bi bi-${empresa.icon}`}></i>
          </div>
          <div className="empresa-info">
            <span>{empresa.name}</span>
            <span className="empresa-count">{empresa.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainEmpresasListado;
