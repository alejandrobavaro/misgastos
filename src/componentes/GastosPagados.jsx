import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../assets/scss/_03-Componentes/_GastosPagados.scss';

// Registrar los elementos de Chart.js necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const GastosPagados = () => {
  const [cuentasPagadas, setCuentasPagadas] = useState([]);
  const [totalPagado, setTotalPagado] = useState(0);
  const [cuentasTotales, setCuentasTotales] = useState(0);

  // Función para obtener el mes actual
  const obtenerMesActual = () => {
    const fecha = new Date();
    const opciones = { month: 'long' };
    return fecha.toLocaleDateString('es-ES', opciones).toUpperCase();
  };

  // Función para obtener la fecha actual
  const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString('es-ES');
  };

  useEffect(() => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const pagadas = cuentas.filter((cuenta) => cuenta.FacturaPagada === 'Si');
      const total = pagadas.reduce((acc, cuenta) => acc + parseFloat(cuenta.ImportePagado || 0), 0);
      setCuentasPagadas(pagadas);
      setTotalPagado(total);
      setCuentasTotales(cuentas.length);
    }
  }, []);

  // Función para marcar una cuenta como no pagada
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
            bloqueado: false,
          };
        }
        return cuenta;
      });
      localStorage.setItem('cuentas', JSON.stringify(actualizadas));
      const noPagadas = actualizadas.filter((cuenta) => cuenta.FacturaPagada === 'Si');
      setCuentasPagadas(noPagadas);
      setTotalPagado(noPagadas.reduce((acc, cuenta) => acc + parseFloat(cuenta.ImportePagado || 0), 0));
    }
  };

  // Calcular el porcentaje de cuentas pagadas
  const porcentajePagadas = (cuentasPagadas.length / cuentasTotales) * 100;

  // Datos para el gráfico circular
  const data = {
    labels: ['Cuentas Pagadas', 'Cuentas No Pagadas'],
    datasets: [
      {
        label: '# de Cuentas',
        data: [cuentasPagadas.length, cuentasTotales - cuentasPagadas.length],
        backgroundColor: [
           '#00fbff', // Color del segmento para cuentas pagadas
          '#00f7ff7c'  // Color del segmento para cuentas no pagadas
        ],
        borderColor: [
         '#00fbff', // Color del borde del segmento para cuentas pagadas
          '#00f7ff7c'  // Color del borde del segmento para cuentas no pagadas
        ],
        borderWidth: 2, // Ancho del borde
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="pagados">
      <h2>
        Gastos Pagados en <span className="mes-corriente">{obtenerMesActual()}</span>
      </h2>

      {/* Sección de Totales Pagados */}
      <div className="totales-pagados">
        <h3>
          TOTALES PAGADOS AL DÍA ({obtenerFechaActual()}): <span>${totalPagado.toFixed(2)}</span>
        </h3>

        {/* Gráfico circular */}
        <div className="grafico-circular">
          <h3>Distribución de Cuentas Pagadas</h3>
          <Doughnut data={data} options={options} />
        </div>

        <div className="progreso-cuentas">
          <span>{cuentasPagadas.length} de {cuentasTotales} cuentas pagadas</span>
          <div className="barra-progreso">
            <div className="relleno-progreso" style={{ width: `${porcentajePagadas}%` }}></div>
          </div>
        </div>
      </div>

      {/* Lista de cuentas pagadas */}
      <div className="lista-cuentas">
        <div className="cuenta-header">
          <span>ID</span>
          <span>Nombre</span>
          <span>Servicio o Impuesto</span>
          <span>Número de Cuenta</span>
          <span>Número de Factura</span>
          <span>Importe Pagado</span>
          <span>Fecha Pagado</span>
          <span>Marcar como No Pagada</span>
        </div>

        {cuentasPagadas.map((cuenta) => (
          <div key={cuenta.id} className="cuenta-item bloqueado">
            <span className="id-col">{cuenta.id}</span>
            <span>{cuenta.Nombre}</span>
            <span>{cuenta.Servicio || cuenta.Impuesto}</span>
            <span>{cuenta['Numero de Cuenta']}</span>
            <span>{cuenta.NumeroFactura}</span>
            <span>${cuenta.ImportePagado}</span>
            <span>{cuenta.FechaPagado}</span>
            <button onClick={() => marcarComoNoPagada(cuenta.id)}>
              No Pagada
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GastosPagados;
