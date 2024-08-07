// src/componentes/MainWhatsappIcon.jsx
import React from 'react';
import '../assets/scss/_03-Componentes/_MainContent.scss'; // Asegúrate de tener este archivo de estilos

function MainWhatsappIcon() {
  return (
    <div id="telefonoWhatsappMainContent">
      <a
        href="https://api.whatsapp.com/send?phone=+542235455451&text=Hola!,%20en%20que%20puedo%20ayudarte?"
        rel="link whatsapp"
        target="_blank"
      >
        <img
          alt="WhatsApp Icon"
          className="logoWhatsappMainContent"
          src="/img/02-logos/logowhattsapp1.png"
        />
      </a>
    </div>
  );
}

export default MainWhatsappIcon;
