import React, { useState, useEffect } from 'react';
import '../assets/scss/_03-Componentes/_MainCalculadora.scss';

const MainCalculadora = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setDisplay(prev => prev + value);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleCalculate = () => {
    try {
      const result = Function(`'use strict'; return (${display})`)();
      if (result !== undefined && !isNaN(result)) {
        setHistory(prev => [...prev, `${display} = ${result}`]);
        setDisplay(result.toString());
      } else {
        setDisplay('Error');
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handlePercentage = () => {
    try {
      const result = eval(display) / 100;
      setDisplay(result.toString());
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleSquareRoot = () => {
    try {
      const result = Math.sqrt(eval(display));
      setDisplay(result.toString());
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handlePower = () => {
    setDisplay(prev => prev + '**');
  };

  const handleMemoryAdd = () => {
    localStorage.setItem('memory', display);
  };

  const handleMemoryRecall = () => {
    setDisplay(localStorage.getItem('memory') || '');
  };

  const handleMemoryClear = () => {
    localStorage.removeItem('memory');
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    if (key === 'Enter') {
      event.preventDefault();
      handleCalculate();
    } else if (key === 'Backspace') {
      setDisplay(prev => prev.slice(0, -1));
    } else if (key === 'Escape') {
      handleClear();
    } else if (key === '%') {
      handlePercentage();
    } else if (key === 'ArrowUp') {
      handleMemoryRecall();
    } else if (key === 'ArrowDown') {
      handleMemoryClear();
    } else if (!isNaN(key) || ['+', '-', '*', '/', '.', '**'].includes(key)) {
      handleClick(key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="calculator-container">
      <div className="calculator-display">
        <div className="display">{display}</div>
        <div className="buttons">
          <button className="number" onClick={() => handleClick('7')}>7</button>
          <button className="number" onClick={() => handleClick('8')}>8</button>
          <button className="number" onClick={() => handleClick('9')}>9</button>
          <button className="operator" onClick={() => handleClick('/')}>/</button>
          <button className="number" onClick={() => handleClick('4')}>4</button>
          <button className="number" onClick={() => handleClick('5')}>5</button>
          <button className="number" onClick={() => handleClick('6')}>6</button>
          <button className="operator" onClick={() => handleClick('*')}>*</button>
          <button className="number" onClick={() => handleClick('1')}>1</button>
          <button className="number" onClick={() => handleClick('2')}>2</button>
          <button className="number" onClick={() => handleClick('3')}>3</button>
          <button className="operator" onClick={() => handleClick('-')}>-</button>
          <button className="number" onClick={() => handleClick('0')}>0</button>
          <button className="operator" onClick={() => handleClick('.')}>.</button>
          <button className="operator" onClick={handleClear}>C</button>
          <button className="operator" onClick={() => handleClick('+')}>+</button>
          <button className="operator" onClick={handlePercentage}>%</button>
          <button className="operator" onClick={handleSquareRoot}>√</button>
          <button className="operator" onClick={handlePower}>^</button>
          <button className="operator" onClick={handleMemoryAdd}>M+</button>
          <button className="operator" onClick={handleMemoryRecall}>MR</button>
          <button className="operator" onClick={handleMemoryClear}>MC</button>
          <button className="operator" onClick={handleCalculate}>=</button>
        </div>
      </div>
      <div className="calculator-history">
        <h3>Historial</h3>
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainCalculadora;
