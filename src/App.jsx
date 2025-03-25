import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FaClock } from 'react-icons/fa'; // Usando react-icons en lugar de Font Awesome

const SecondsCounter = ({ seconds, isCountdown = false, targetTime = null }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <FaClock size={24} />
      <span style={{ fontSize: '24px' }}>
        {seconds} {isCountdown ? 'seconds remaining' : 'seconds elapsed'}
      </span>
    </div>
  );
};

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isCountdown, setIsCountdown] = useState(false);
  const [initialValue, setInitialValue] = useState(null);
  const [targetTime, setTargetTime] = useState(null);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (isCountdown) {
            if (prev <= 0) {
              clearInterval(interval);
              return 0;
            }
            if (targetTime && prev === targetTime) {
              alert(`¡Se alcanzó el tiempo objetivo de ${targetTime} segundos!`);
            }
            return prev - 1;
          } else {
            if (targetTime && prev === targetTime) {
              alert(`¡Se alcanzó el tiempo objetivo de ${targetTime} segundos!`);
            }
            return prev + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isCountdown, targetTime]);

  const startCountdown = (value) => {
    setSeconds(value);
    setInitialValue(value);
    setIsCountdown(true);
    setIsActive(true);
  };

  const reset = () => {
    setSeconds(isCountdown && initialValue ? initialValue : 0);
    setIsActive(false);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const handleTargetTime = (e) => {
    const value = parseInt(e.target.value);
    setTargetTime(value > 0 ? value : null);
  };

  return (
    <div>
      <SecondsCounter 
        seconds={seconds} 
        isCountdown={isCountdown}
        targetTime={targetTime}
      />
      
      <div style={{ padding: '20px' }}>
        <button onClick={togglePause}>
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button onClick={reset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
        
        <div style={{ marginTop: '20px' }}>
          <input 
            type="number" 
            placeholder="Countdown from (seconds)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                startCountdown(parseInt(e.target.value));
              }
            }}
            style={{ marginRight: '10px' }}
          />
          <button onClick={() => startCountdown(parseInt(document.querySelector('input').value))}>
            Start Countdown
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <input
            type="number"
            placeholder="Set target time for alert"
            onChange={handleTargetTime}
          />
        </div>
      </div>
    </div>
  );
};

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
html