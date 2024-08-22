import React, { useState } from 'react';
import '../assets/scss/_03-Componentes/_MainCalculadora.scss';

const MainCalculadora = () => {
  const [display, setDisplay] = useState('');

  const handleClick = (value) => {
    setDisplay(prev => prev + value);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display)); // Nota: eval puede ser inseguro si se usa con entrada no confiable
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator-outer-container">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Calculadora</h2>
        </div>
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('/')}>/</button>
          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('*')}>*</button>
          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('-')}>-</button>
          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={() => handleClick('.')}>.</button>
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleClick('+')}>+</button>
          <button onClick={handleCalculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default MainCalculadora;
