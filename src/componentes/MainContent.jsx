import React, { useState } from "react";
import '../assets/scss/_03-Componentes/_MainContent.scss';

function MainContent() {
  const [count, setCount] = useState(0);

  return (
    <main className="mainContent">
      {/* Primera sección del grid */}
      <div className="gridPadre1MainContent">
        <div className="objetoCentradoMainContent1">
          <a href="#">
            <img
              alt="icono"
              className="imagen-publicidadMainContent1"
              src="/img/05-img-costados-larga/4.png"
            />
          </a>
          <img
            alt="imagen"
            className="imagen-publicidadMainContent2"
            src="/img/02-logos/logomisgastos1.png"
          />
          <a href="#">
            <img
              alt="icono"
              className="imagen-publicidadMainContent1"
              src="/img/05-img-costados-larga/3.png"
            />
          </a>
        </div>
      </div>

      {/* Segunda sección del grid */}
      <div className="gridPadreMainContent">
        <div className="objetoCentradoMainContent1">
          {/* <a href="#">
            <img
              alt="icono"
              className="imagen-publicidadMainContent1"
              src="/img/05-img-costados-larga/20.png"
            />
          </a> */}
          <a href="#">
            <img
              className="imagen-publicidadMainContent3"
              src="/img/05-gif/i-love-money-pay-day.gif"
              alt=""
            />
          </a>
          {/* <a href="#">
            <img
              alt="icono"
              className="imagen-publicidadMainContent1"
              src="/img/05-img-costados-larga/2.png"
            />
          </a> */}
        </div>
      </div>
    </main>
  );
}

export default MainContent;
