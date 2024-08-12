import React from "react";

const AppModoClaroOscuro = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      className="theme-switcher-button"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? "🌙" : "☀️"} {/* Cambia el icono según el modo */}
    </button>
  );
};

export default AppModoClaroOscuro;
