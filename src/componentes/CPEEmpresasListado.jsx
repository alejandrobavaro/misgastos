import React, { useState, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_CPEEmpresasListado.scss";

const serviceIcons = {
  'Tarjetas de Credito': 'credit-card',
  'Gas': 'fire',
  'Agua': 'tint',
  'Electricidad': 'lightbulb',
  'Medicina Prepaga': 'stethoscope',
  'Telefonía': 'phone',
  'Consorcios': 'building',
  'Otros Servicios': 'cogs',
};

const CPEEmpresasListado = () => {
  const [data, setData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch("/infocuentas.json")
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error("Error al cargar los datos:", error));
  }, []);

  const groupedData = data.reduce((acc, item) => {
    const service = item.Servicio || "Sin Servicio";
    if (!acc[service]) {
      acc[service] = [];
    }
    acc[service].push(item);
    return acc;
  }, {});

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleBackClick = () => {
    setSelectedService(null);
  };

  return (
    <div className="cpe-empresas-listado">
      {!selectedService ? (
        Object.keys(groupedData).map(service => (
          <div key={service} className="cpe-empresa-card" onClick={() => handleServiceClick(service)}>
            <div className="cpe-empresa-icon">
              <i className={`bi bi-${serviceIcons[service] || 'question-circle'}`}></i>
            </div>
            <div className="cpe-empresa-info">
              <span>{service}</span>
              <span className="cpe-empresa-count">{groupedData[service].length}</span>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2 className='titulosDetallesServicio'>Detalles del Servicio: {selectedService}  <span className='separador'><button className="cpe-back-button" onClick={handleBackClick}>Volver</button></span>  </h2>
         
          <table className="cpe-detalle-servicio-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Empresa</th>
                <th>Sección</th>
                <th>Numero de Cuenta</th>
                <th>CPE</th>
                <th>Titular</th>
                <th>Vencimiento</th>
                <th>Consumo Mes</th>
                <th>Factura Pagada</th>
                <th>Importe Pagado</th>
                <th>Factura Imagen</th>
                <th>Factura Digital Recibida</th>
                <th>Factura Digital al mail</th>
                <th>Información Extra</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[selectedService].map((item) => (
                <tr key={item.id}>
                  <td>{item.Nombre}</td>
                  <td>{item.Tipo}</td>
                  <td>{item.Empresa}</td>
                  <td>{item.Sección}</td>
                  <td>{item["Numero de Cuenta"]}</td>
                  <td>{item["CPE (Codigo Pago Electronico)"]}</td>
                  <td>{item.Titular}</td>
                  <td>{item.Vencimiento}</td>
                  <td>{item["Consumo Mes"]}</td>
                  <td>{item["Factura Pagada"]}</td>
                  <td>{item["Importe Pagado"]}</td>
                  <td>{item["Factura Imagen"]}</td>
                  <td>{item["Factura Digital Recibida"]}</td>
                  <td>{item["Factura Digital al mail"]}</td>
                  <td>{item["Información Extra"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CPEEmpresasListado;
