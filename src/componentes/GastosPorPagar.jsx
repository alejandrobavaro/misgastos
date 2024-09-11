import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../assets/scss/_03-Componentes/_GastosPorPagar.scss';


const GastosPorPagar = () => {
  const [cuentasPorPagar, setCuentasPorPagar] = useState([]);

  const cargarCuentasIniciales = async () => {
    try {
      const response = await fetch('/infocuentas.json');
      const cuentas = await response.json();
      setCuentasPorPagar(cuentas);
      localStorage.setItem('cuentas', JSON.stringify(cuentas));
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  };

  useEffect(() => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const noPagadas = cuentas.filter((cuenta) => cuenta.FacturaPagada !== 'Si');
      setCuentasPorPagar(noPagadas);
    } else {
      cargarCuentasIniciales();
    }
  }, []);

  const marcarComoPagada = (id, importePagado, fechaPagado) => {
    if (!importePagado || isNaN(importePagado) || importePagado.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar el importe pagado (solo números) antes de marcar como pagada',
      });
      return;
    }

    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const actualizadas = cuentas.map((cuenta) => {
        if (cuenta.id === id) {
          return { 
            ...cuenta, 
            FacturaPagada: 'Si', 
            ImportePagado: importePagado, 
            FechaPagado: fechaPagado || new Date().toLocaleDateString(),
            bloqueado: true 
          };
        }
        return cuenta;
      });
      localStorage.setItem('cuentas', JSON.stringify(actualizadas));
      setCuentasPorPagar(actualizadas.filter(cuenta => cuenta.FacturaPagada !== 'Si'));
    }
  };

  const limpiarLocalStorage = () => {
    localStorage.removeItem('cuentas');
    cargarCuentasIniciales();
    Swal.fire({
      icon: 'success',
      title: 'El estado de las cuentas ha sido restablecido',
    });
  };

  const descargarJSON = () => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.stringify(JSON.parse(cuentasLocalStorage), null, 2);
      const blob = new Blob([cuentas], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'cuentas_actualizadas.json';
      link.click();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'No hay cuentas para descargar',
      });
    }
  };

  return (
    <div className="por-pagar">
      <h2>Gastos Por Pagar</h2>
      <div className="lista-cuentas">
        {cuentasPorPagar.map((cuenta) => (
          <div key={cuenta.id} className={`cuenta-item ${cuenta.bloqueado ? 'bloqueado' : ''}`}>
            <span>{cuenta.Nombre}</span>
            <span>{cuenta.Servicio || cuenta.Impuesto}</span>
            <span>{cuenta["Numero de Cuenta"]}</span>
            <span>{cuenta["CPE (Codigo Pago Electronico)"]}</span>
            <span>{cuenta.Vencimiento}</span>
            {cuenta.bloqueado ? (
              <>
                <span className="importe-pagado">
                  Importe Pagado: ${cuenta.ImportePagado}
                </span>
                <span>Fecha Pagado: {cuenta.FechaPagado}</span>
              </>
            ) : (
              <>
                <label htmlFor={`importe-${cuenta.id}`}>Importe Pagado:</label>
                <div className="input-container">
                  <span>$</span>
                  <input
                    id={`importe-${cuenta.id}`}
                    type="text"
                    placeholder="0"
                    onChange={(e) => {
                      if (!isNaN(e.target.value)) {
                        cuenta.ImportePagado = e.target.value;
                      }
                    }}
                  />
                </div>
                <button onClick={() => marcarComoPagada(cuenta.id, cuenta.ImportePagado)}>
                  Marcar como Pagada
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={limpiarLocalStorage}>Limpiar LocalStorage</button>
      <button onClick={descargarJSON}>Descargar JSON</button>
    </div>
  );
};

export default GastosPorPagar;
