import React, { useState, useEffect } from 'react';
import '../assets/scss/_03-Componentes/_GastosPagados.scss';

const GastosPagados = () => {
  const [cuentasPagadas, setCuentasPagadas] = useState([]);

  useEffect(() => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const pagadas = cuentas.filter((cuenta) => cuenta.FacturaPagada === 'Si');
      setCuentasPagadas(pagadas);
    }
  }, []);

  const marcarComoNoPagada = (id) => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const actualizadas = cuentas.map((cuenta) => {
        if (cuenta.id === id) {
          return { 
            ...cuenta, 
            FacturaPagada: 'No', 
            ImportePagado: '', 
            FechaPagado: '', 
            bloqueado: false 
          };  // Reiniciamos los valores relacionados con el pago
        }
        return cuenta;
      });
      localStorage.setItem('cuentas', JSON.stringify(actualizadas));
      const noPagadas = actualizadas.filter((cuenta) => cuenta.FacturaPagada === 'Si');
      setCuentasPagadas(noPagadas);
    }
  };

  return (
    <div className="pagados">
      <h2>Gastos Pagados</h2>
      <div className="lista-cuentas">
        {cuentasPagadas.map((cuenta) => (
          <div key={cuenta.id} className="cuenta-item">
            <span>{cuenta.Nombre}</span>
            <span>{cuenta.Servicio || cuenta.Impuesto}</span>
            <span>{cuenta["Numero de Cuenta"]}</span>
            <span>{cuenta["CPE (Codigo Pago Electronico)"]}</span>
            <span>{cuenta.Vencimiento}</span>
            <span className="importe-pagado">
              Importe Pagado: ${cuenta.ImportePagado}
            </span>
            <span className="factura-pagada pagada">
              ✔️ Pagada
            </span>
            <button onClick={() => marcarComoNoPagada(cuenta.id)}>Marcar como No Pagada</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GastosPagados;
