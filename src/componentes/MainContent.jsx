import React, { useState } from "react";
import MainCalendarioPagos from './MainCalendarioPagos';
import MainNotas from './MainNotas'; 
import '../assets/scss/_03-Componentes/_MainContent.scss';

function MainContent() {
  const [count, setCount] = useState(0);

  return (
    <main className="mainContent">
      <div className="gridContainerMainContent">
        <div className="gridItem">
          <MainCalendarioPagos />
        </div>
       
        <div className="gridItem">
          <MainNotas /> {/* Agrega el componente MainNotas aquí */}
        </div>
        {/* <div className="gridItem">
          <img
            alt="imagen"
            className="imagen-publicidadMainContent2"
            src="/img/02-logos/logomisgastos1.png"
          />
        </div> */}
      </div>
    </main>
  );
}

export default MainContent;
