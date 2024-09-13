import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../assets/scss/_03-Componentes/_GastosPorPagar.scss";
import "../assets/scss/_01-General/_SweetAlert.scss"; 

const GastosPorPagar = () => {
  const [cuentasPorPagar, setCuentasPorPagar] = useState([]);
  const [facturaInput, setFacturaInput] = useState({});

  const cargarCuentasIniciales = async () => {
    try {
      const response = await fetch("/infocuentas.json");
      const cuentas = await response.json();
      setCuentasPorPagar(cuentas);
      localStorage.setItem("cuentas", JSON.stringify(cuentas));
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };

  useEffect(() => {
    const cuentasLocalStorage = localStorage.getItem("cuentas");
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const noPagadas = cuentas.filter(
        (cuenta) => cuenta.FacturaPagada !== "Si"
      );
      setCuentasPorPagar(noPagadas);
    } else {
      cargarCuentasIniciales();
    }
  }, []);

  const marcarComoPagada = (id) => {
    const importePagado = document.getElementById(`importe-${id}`).value;
    const numeroFactura = facturaInput[id] || "";

    if (!importePagado || isNaN(importePagado) || importePagado.trim() === "") {
      Swal.fire({
        icon: "warning",
        title:
          "Debe ingresar el importe pagado en números antes de marcar la Factura como pagada",
      });
      return;
    }

    if (!numeroFactura.trim()) {
      Swal.fire({
        icon: "warning",
        title:
          "Debe ingresar el número de factura antes de marcarla como pagada",
      });
      return;
    }

    const cuentasLocalStorage = localStorage.getItem("cuentas");
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const actualizadas = cuentas.map((cuenta) => {
        if (cuenta.id === id) {
          return {
            ...cuenta,
            FacturaPagada: "Si",
            ImportePagado: importePagado,
            FechaPagado: new Date().toLocaleDateString(),
            NumeroFactura: numeroFactura, // Agregar el número de factura actualizado
            bloqueado: true,
          };
        }
        return cuenta;
      });

      // Guardar las cuentas actualizadas en localStorage
      localStorage.setItem("cuentas", JSON.stringify(actualizadas));
      setCuentasPorPagar(
        actualizadas.filter((cuenta) => cuenta.FacturaPagada !== "Si")
      );

      // Calcular y guardar los totales en localStorage
      const totales = actualizadas.reduce((acc, cuenta) => {
        if (cuenta.FacturaPagada === "Si") {
          return acc + parseFloat(cuenta.ImportePagado) || 0;
        }
        return acc;
      }, 0);
      localStorage.setItem("totales", JSON.stringify(totales));
    }
  };

  const limpiarLocalStorage = () => {
    localStorage.removeItem("cuentas");
    localStorage.removeItem("totales");
    cargarCuentasIniciales();
    Swal.fire({
      icon: "success",
      title: "El estado de las cuentas ha sido restablecido",
    });
  };

  const descargarJSON = () => {
    const cuentasLocalStorage = localStorage.getItem("cuentas");
    if (cuentasLocalStorage) {
      const cuentas = JSON.stringify(JSON.parse(cuentasLocalStorage), null, 2);
      const blob = new Blob([cuentas], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "cuentas_actualizadas.json";
      link.click();
    } else {
      Swal.fire({
        icon: "info",
        title: "No hay cuentas para descargar",
      });
    }
  };

  // Obtener el nombre del mes actual
  const obtenerMesActual = () => {
    const fecha = new Date();
    const opciones = { month: "long" };
    return fecha.toLocaleDateString("es-ES", opciones).toUpperCase();
  };

  return (
    <div className="por-pagar">
      <div>
        <h2>
          Gastos Por Pagar en{" "}
          <span className="mes-corriente">{obtenerMesActual()}</span>{" "}
          <span>
            {" "}
            <button onClick={limpiarLocalStorage}>Limpiar LocalStorage</button>
            <button onClick={descargarJSON}>Descargar JSON</button>{" "}
          </span>
        </h2>
      </div>

      <div className="lista-cuentas">
        {/* Encabezado de la tabla */}
        <div className="cuenta-header">
          <span>ID</span>
          <span>Nombre</span>
          <span>Servicio o Impuesto</span>
          <span>Número de Cuenta</span>
          <span>Número de Factura</span>
          <span>Vencimiento</span>
          <span>Importe Pagado</span>
          <span>Marcar como Pagada</span>
        </div>

        {/* Lista de cuentas */}
        {cuentasPorPagar.map((cuenta) => (
          <div
            key={cuenta.id}
            className={`cuenta-item ${cuenta.bloqueado ? "bloqueado" : ""}`}
          >
            <span className="id-col">{cuenta.id}</span>{" "}
            {/* Nueva columna de ID */}
            <span>{cuenta.Nombre}</span>
            <span>{cuenta.Servicio || cuenta.Impuesto}</span>
            <span>{cuenta["Numero de Cuenta"]}</span>
            <span>
              {cuenta.bloqueado ? (
                cuenta["Numero de Factura"]
              ) : (
                <input
                  type="text"
                  placeholder=" Nº Factura"
                  value={facturaInput[cuenta.id] || ""}
                  onChange={(e) => {
                    // Solo permitir números en el campo de número de factura
                    const valor = e.target.value;
                    if (/^\d*$/.test(valor)) {
                      setFacturaInput({
                        ...facturaInput,
                        [cuenta.id]: valor,
                      });
                    }
                  }}
                />
              )}
            </span>
            <span>{cuenta.Vencimiento}</span>
            {cuenta.bloqueado ? (
              <>
                <span className="importe-pagado">
                  Importe Pagado: ${cuenta.ImportePagado}
                </span>
                <span>Fecha Pagado: {cuenta.FechaPagado}</span>
                <span>Número de Factura: {cuenta.NumeroFactura}</span>
              </>
            ) : (
              <>
                <div className="input-container">
                  <span>$</span>
                  <input
                    id={`importe-${cuenta.id}`}
                    type="text"
                    placeholder="0"
                    onChange={(e) => {
                      // Solo permitir números en el campo de Importe Pagado
                      const valor = e.target.value;
                      if (/^\d*\.?\d*$/.test(valor)) {
                        // Permitir números y un punto decimal
                        // Actualizar el valor del campo sin cambiar el estado global directamente
                        document.getElementById(`importe-${cuenta.id}`).value =
                          valor;
                      }
                    }}
                  />
                </div>
                <button onClick={() => marcarComoPagada(cuenta.id)}>
                  Pagada
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GastosPorPagar;
