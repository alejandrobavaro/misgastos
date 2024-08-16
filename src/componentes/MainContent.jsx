import React from "react";
import MainCalendarioPagos from "./MainCalendarioPagos";


import "../assets/scss/_03-Componentes/_MainContent.scss";

function MainContent() {
  return (
    <main className="mainContent ">
      <div className="gridPadre"></div>

      <div className="gridItem">
        <MainCalendarioPagos />
      </div>
      
    </main>
  );
}

export default MainContent;
