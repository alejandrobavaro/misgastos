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
      const result = Function('"use strict"; return (' + display + ')')();
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
      <div className="calculator-body">
        <div className="calculator-display">
          <div className="outer-display-container">
            <div className="inner-display-container">
              <input 
                type="text" 
                className="display" 
                value={display} 
                onChange={(e) => setDisplay(e.target.value)} 
                readOnly 
              />
            </div>
          </div>
        </div>
        <div className="calculator-buttons">
          <button className="buttonlogo"><img src="../../public/img/01-favicon/logo1.ico" alt="logochancho1" /></button>
          <button className="button operator" onClick={handleSquareRoot}>√</button>
          <button className="button operator" onClick={() => handleClick('/')}>÷</button>
          <button className="button operator" onClick={() => handleClick('*')}>x</button>
          <button className="button operator" onClick={() => handleClick('-')}>-</button>
          <button className="button operator" onClick={handlePercentage}>%</button>

          <button className="button special simbolocombinado turnoffsound">♪</button>
          <button className="button number" onClick={() => handleClick('7')}>7</button>
          <button className="button number" onClick={() => handleClick('8')}>8</button>
          <button className="button number" onClick={() => handleClick('9')}>9</button>
          <button className="button simbolocombinado" onClick={() => handleClick('+')}>+</button>
          <button className="button operator" onClick={handleMemoryClear}>MC</button>

          
          <button className="button number" onClick={() => handleClick('4')}>4</button>
          <button className="button number" onClick={() => handleClick('5')}>5</button>
          <button className="button number" onClick={() => handleClick('6')}>6</button>
    
          <button className="button operator" onClick={handleMemoryRecall}>MR</button>

          <button className="button clear simbolocombinado" onClick={handleClear}>CE</button>
          <button className="button number" onClick={() => handleClick('1')}>1</button>
          <button className="button number" onClick={() => handleClick('2')}>2</button>
          <button className="button number" onClick={() => handleClick('3')}>3</button>
          <button className="button operator equal simbolocombinado" onClick={handleCalculate}>=</button>
          <button className="button operator" onClick={() => handleClick('M-')}>M-</button>

         
          <button className="button number" onClick={() => handleClick('0')}>0</button>
          <button className="button number" onClick={() => handleClick('0')}>0</button>
          <button className="button specialComa" onClick={() => handleClick(',')}>,</button>
         
          <button className="button operator" onClick={() => handleClick('M+')}>M+</button>
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
