import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_HeaderDolarApi.scss"; // Asegúrate de que el path sea correcto

const HeaderDolarApi = () => {
  const [dollarData, setDollarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDollarValue = async () => {
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares");
        const data = await response.json();
        // Filtrar los datos para excluir 'cripto' y seleccionar solo los 6 ítems necesarios
        const filteredData = data.filter(d =>
          ['oficial', 'blue', 'bolsa', 'contadoconliqui', 'mayorista', 'tarjeta'].includes(d.casa)
        ).map(d => ({
          nombre: d.casa === 'contadoconliqui' ? 'Liquid' : d.nombre,
          compra: d.compra,
          venta: d.venta
        }));
        setDollarData(filteredData);
      } catch (error) {
        console.error("Error fetching dollar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDollarValue();
  }, []);

  if (loading) {
    return <div className="dollar-container">Cargando...</div>;
  }

  // Dividir los datos en tres columnas
  const columns = [dollarData.slice(0, 2), dollarData.slice(2, 4), dollarData.slice(4, 6)];

  return (
    <div className="dollar-container">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="dollar-column">
          {column.map((dollar, index) => (
            <div key={index}>
              <span className="dollar-name">{dollar.nombre}</span>: ${dollar.venta}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HeaderDolarApi;
