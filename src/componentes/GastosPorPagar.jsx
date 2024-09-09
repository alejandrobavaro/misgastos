import React, { useState, useEffect } from 'react';
import '../assets/scss/_03-Componentes/_GastosPorPagar.scss';
import { FaArrowRight } from 'react-icons/fa';

const GastosPorPagar = () => {
  const [cuentas, setCuentas] = useState([]);
  const [updatedCuentas, setUpdatedCuentas] = useState([]);

  useEffect(() => {
    // Cargar el archivo JSON
    fetch('/infocuentas.json')
      .then((response) => response.json())
      .then((data) => {
        setCuentas(data);
        setUpdatedCuentas(data.map(item => ({
          ...item,
          nuevoImporte: ''
        })));
      })
      .catch((error) => console.error('Error al cargar el JSON:', error));
  }, []);

  // Alternar el estado de factura pagada
  const toggleFacturaPagada = (itemId) => {
    setUpdatedCuentas((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, FacturaPagada: item.FacturaPagada === 'Si' ? 'No' : 'Si' } : item
      )
    );
  };

  // Manejar el cambio del importe
  const handleImporteChange = (index, value) => {
    const newCuentas = [...updatedCuentas];
    newCuentas[index].nuevoImporte = value;
    setUpdatedCuentas(newCuentas);
  };

  // Guardar el nuevo importe y actualizar la factura a pagada
  const handleGuardarImporte = (index) => {
    const newCuentas = [...updatedCuentas];
    const cuenta = newCuentas[index];
    if (cuenta.nuevoImporte) {
      // Actualizar el importe pagado y el estado de factura
      newCuentas[index] = {
        ...cuenta,
        ImportePagado: cuenta.nuevoImporte,
        FacturaPagada: 'Si',
        nuevoImporte: ''
      };
      setUpdatedCuentas(newCuentas);
    }
  };

  return (
    <div className="por-pagar">
      <h2>Gastos por Pagar</h2>
      <div className="lista-cuentas">
        {updatedCuentas.map((cuenta, index) => (
          <div key={cuenta.id} className="cuenta-item">
            <span>{cuenta.Nombre}</span>
            <span>{cuenta.Servicio || cuenta.Impuesto}</span>
            <span>{cuenta["Numero de Cuenta"]}</span>
            <span>{cuenta["CPE (Codigo Pago Electronico)"]}</span>
            <span>{cuenta.Vencimiento}</span>
            <span>
              {/* Mostrar el importe pagado del mes anterior */}
              <label className="importe-label">
                (Pagado mes anterior: ${cuenta["Importe Pagado"]})
              </label>
              <input
                type="number"
                value={cuenta.nuevoImporte}
                onChange={(e) => handleImporteChange(index, e.target.value)}
                placeholder="0"
              />
              <button
                className="guardar-boton"
                onClick={() => handleGuardarImporte(index)}
              >
                <FaArrowRight />
              </button>
            </span>
            <span
              className={`factura-pagada ${cuenta.FacturaPagada === 'Si' ? 'pagada' : 'no-pagada'}`}
              onClick={() => toggleFacturaPagada(cuenta.id)}
            >
              {cuenta.FacturaPagada === 'Si' ? '✔️' : '❌'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GastosPorPagar;
