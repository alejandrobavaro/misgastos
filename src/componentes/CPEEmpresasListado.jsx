import React, { useState, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_CPEEmpresasListado.scss";

const CPEEmpresasListado = () => {
  const [data, setData] = useState([]);
  const [selectedService, setSelectedService] = useState("TODOS");

  useEffect(() => {
    fetch("/infocuentas.json")
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error("Error al cargar los datos:", error));
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const groupedData = data.reduce((acc, item) => {
    const service = item.Servicio || "Sin Servicio";
    if (!acc[service]) {
      acc[service] = [];
    }
    acc[service].push(item);
    return acc;
  }, {});

  const displayedServices = selectedService === "TODOS" 
    ? Object.keys(groupedData)
    : [selectedService];

  return (
    <div className="main-empresas-listado">
       <div className="filter-field-select">
      <select value={selectedService} onChange={handleServiceChange}>
        <option value="TODOS">TODOS</option>
        {Object.keys(groupedData).map(service => (
          <option key={service} value={service}>{service}</option>
        ))}
      </select>
      </div>

      {displayedServices.map(service => (
        <div key={service} className="empresa-card">
          <div className="empresa-icon">
            <i className={`bi bi-lightbulb`}></i>
          </div>
          <div className="empresa-info">
            <span>{service}</span>
            <span className="empresa-count">{groupedData[service].length}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CPEEmpresasListado;
