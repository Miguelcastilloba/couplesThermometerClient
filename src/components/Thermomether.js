import React from 'react';

function Thermometer({ level, setLevel, readonly }) {
  const handleIncrease = () => {
    if (!readonly) setLevel((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (!readonly && level > 0) setLevel((prev) => prev - 1);
  };

  return (
    <div className="thermometer">
      <button onClick={handleDecrease} disabled={readonly}>-</button>
      <span>{level}</span>
      <button onClick={handleIncrease} disabled={readonly}>+</button>
    </div>
  );
}

export default Thermometer;
