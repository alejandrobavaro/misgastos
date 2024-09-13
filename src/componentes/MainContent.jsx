import React from "react";

import GastosPorPagar from "./GastosPorPagar";
import "../assets/scss/_03-Componentes/_MainContent.scss";

function MainContent() {
  return (
    <main className="mainContent ">
      <div className="gridPadre"></div>

      <div className="gridItem">
      <GastosPorPagar />
    
      </div>
      

   
    </main>
  );
}

export default MainContent;
