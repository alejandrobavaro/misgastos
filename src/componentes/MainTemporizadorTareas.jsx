import React, { useState, useEffect } from 'react';
import '../assets/scss/_03-Componentes/_MainTemporizadorTareas.scss';
import { FaTrash } from 'react-icons/fa'; // Importar el ícono de eliminar
import MainTemporizadorTimePicker from './MainTemporizadorTimePicker'; // Importar el nuevo componente

const MainTemporizadorTareas = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [progress, setProgress] = useState(100);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const newTotalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    setTotalTime(newTotalTime);
    setTimeLeft(newTotalTime);
    setProgress(100);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (isActive && !isPaused) {
      const id = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(id);
            setIsActive(false);
            playAlarm();
            return 0;
          }
          const newProgress = (prevTime / totalTime) * 100;
          setProgress(newProgress);
          return prevTime - 10;
        });
      }, 10); // Actualiza cada 10 milisegundos
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isActive, isPaused, totalTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startTimer = () => {
    if (timeLeft > 0 && !isActive) {
      setIsActive(true);
      setIsPaused(false);
      addToHistory(); // Agregar al historial al iniciar
    }
  };

  const addToHistory = () => {
    if (taskName) {
      setHistory(prevHistory => [
        ...prevHistory,
        {
          taskName,
          hours,
          minutes,
          seconds,
          totalTime: (hours * 3600 + minutes * 60 + seconds)
        }
      ]);
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    setTimeLeft(totalTime);
    setIsActive(false);
    setIsPaused(false);
    setProgress(100);
    clearInterval(intervalId);
  };

  const deleteTimer = () => {
    resetTimer();
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTaskName('');
  };

  const playAlarm = () => {
    const audio = new Audio('/path/to/alarm-sound.mp3'); // Ruta al archivo de sonido
    audio.play();
  };

  return (
    <div className="main-temporizador-tareas">
        
      <div className="timer-container">
        <div className="circle-container">
          <div
            className="circle"
            style={{ 
              background: `conic-gradient(#FF6B6B ${progress}%, #333 ${progress}%)`
            }}
          >
            <div className="time-display">
              {`${Math.floor(timeLeft / 3600000).toString().padStart(2, '0')}:
                ${Math.floor((timeLeft % 3600000) / 60000).toString().padStart(2, '0')}:
                ${Math.floor((timeLeft % 60000) / 1000).toString().padStart(2, '0')}`}
            </div>
          </div>
        </div>
        <MainTemporizadorTimePicker 
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Nombre de la tarea"
          className="task-input"
        />
        <div className="buttons">
          {!isActive && !isPaused && (
            <button onClick={startTimer}>Iniciar</button>
          )}
          {isActive && !isPaused && (
            <>
              <button onClick={pauseTimer}>Pausar</button>
              <button onClick={deleteTimer}>
                <FaTrash />
              </button>
            </>
          )}
          {isPaused && (
            <button onClick={() => setIsActive(true)}>Reanudar</button>
          )}
          {(!isActive && totalTime > 0) && (
            <button onClick={resetTimer}>Reiniciar</button>
          )}
        </div>

        <div className="current-time">
        {currentTime.toLocaleTimeString()}
      </div>

      </div>
    
    
      <div className="history">
        <h3>Historial de Tareas</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <span>{item.taskName}</span>
              <span>{`${item.hours}h ${item.minutes}m ${item.seconds}s`}</span>
              <button onClick={() => setHistory(history.filter((_, i) => i !== index))}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainTemporizadorTareas;
