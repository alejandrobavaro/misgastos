import React, { useState, useEffect } from 'react';
import '../assets/scss/_03-Componentes/_DataInfoCuentas.scss';

const DataInfoCuentas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Cargar los datos del archivo JSON
    fetch('/infocuentas.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <div className="data">
      <h2>Mis Datos</h2>
      {data.length === 0 ? (
        <h1>Cargando datos...</h1>
      ) : (
        <div className="data-container">
          {data.map(item => (
            <div key={item.id} className="data-item">
              <h3>{item.Nombre}</h3>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Servicio:</strong></td>
                    <td>{item.Servicio}</td>
                  </tr>
                  <tr>
                    <td><strong>Empresa:</strong></td>
                    <td>{item.Empresa}</td>
                  </tr>
                  <tr>
                    <td><strong>Impuesto:</strong></td>
                    <td>{item.Impuesto}</td>
                  </tr>
                  <tr>
                    <td><strong>Agente Recaudador:</strong></td>
                    <td>{item['Agente Recaudador']}</td>
                  </tr>
                  <tr>
                    <td><strong>Sección:</strong></td>
                    <td>{item.Sección}</td>
                  </tr>
                  <tr>
                    <td><strong>Número de Cuenta:</strong></td>
                    <td>{item['Numero de Cuenta']}</td>
                  </tr>
                  <tr>
                    <td><strong>CPE:</strong></td>
                    <td>{item['CPE (Codigo Pago Electronico)']}</td>
                  </tr>
                  <tr>
                    <td><strong>Titular:</strong></td>
                    <td>{item.Titular}</td>
                  </tr>
                  <tr>
                    <td><strong>Vencimiento:</strong></td>
                    <td>{item.Vencimiento}</td>
                  </tr>
                  <tr>
                    <td><strong>Consumo Mes:</strong></td>
                    <td>{item['Consumo Mes']}</td>
                  </tr>
                  <tr>
                    <td><strong>Factura Pagada:</strong></td>
                    <td>{item['Factura Pagada']}</td>
                  </tr>
                  <tr>
                    <td><strong>Pagado con:</strong></td>
                    <td>{item['Pagado con']}</td>
                  </tr>
                  <tr>
                    <td><strong>Importe Pagado:</strong></td>
                    <td>{item['Importe Pagado']}</td>
                  </tr>
                  <tr>
                    <td><strong>Factura Digital Recibida:</strong></td>
                    <td>{item['Factura Digital Recibida']}</td>
                  </tr>
                  <tr>
                    <td><strong>Factura Digital al mail:</strong></td>
                    <td>{item['Factura Digital al mail']}</td>
                  </tr>
                  <tr>
                    <td><strong>Información Extra:</strong></td>
                    <td>{item['Información Extra']}</td>
                  </tr>
                </tbody>
              </table>
              <a href={`/path-to-invoice-pdfs/${item['Factura Imagen']}`} target="_blank" rel="noopener noreferrer">
                Ver Factura
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataInfoCuentas;
