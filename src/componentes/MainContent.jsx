import React from "react";
import MainCalendarioPagos from './MainCalendarioPagos';
import MainNotas from './MainNotas';
import MainTareasEnProceso from './MainTareasEnProceso'; // Importa el nuevo componente
import '../assets/scss/_03-Componentes/_MainContent.scss';

function MainContent() {
  return (
    <main className="mainContent ">
      <div className="gridPadre">
    
        
      <div className="gridItem tasks ">
          <MainTareasEnProceso /> 
        </div>

        </div>
        <div className="mainContentContainer">

        <div className="gridItem calendar">
          <MainCalendarioPagos />
        </div>

        <div className="gridItem notes">
          <MainNotas />
        </div>

    


      </div>
    </main>
  );
}

export default MainContent;
