import React from 'react';
import "../assets/scss/_03-Componentes/_CPEImpuestosListado.scss";

const impuestos = [
  { name: 'Impuestos Municipales', count: 1, icon: 'building' },
 { name: 'Impuestos Provinciales', count: 2, icon: 'landmark' },
  { name: 'Impuestos AFIP (VEP)', count: 1, icon: 'file-invoice-dollar' },
  { name: 'Patentes', count: 1, icon: 'car' },
 { name: 'Bienes Personales', count: 1, icon: 'home' },
];


const CPEImpuestosListado = () => {
  return (
    <div className="main-empresas-listado">
      {impuestos.map((impuesto, index) => (
        <div key={index} className="empresa-card">
          <div className="empresa-icon">
            <i className={`bi bi-${impuesto.icon}`}></i>
          </div>
          <div className="empresa-info">
            <span>{impuesto.name}</span>
            <span className="empresa-count">{impuesto.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CPEImpuestosListado;
