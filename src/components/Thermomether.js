import React from 'react';
import './Thermometer.css';

function Thermometer({ level, setLevel, readonly }) {
  // Ensure level stays within 0 and 10
  const handleIncrease = () => {
    if (!readonly && level < 10) setLevel((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (!readonly && level > 0) setLevel((prev) => prev - 1);
  };

  // Calculate the fill height percentage (from 0% to 100%)
  const fillHeight = `${(level / 10) * 100}%`;

  // Simple function to transition color from green (level 0) to red (level 10)
  // This is a quick approximation, blending green and red channels linearly.
  const getFillColor = (lvl) => {
    const redValue = Math.round((lvl / 10) * 255);      //  0 → 255
    const greenValue = Math.round(255 - (lvl / 10) * 255); // 255 → 0
    return `rgb(${redValue}, ${greenValue}, 0)`;
  };

  // Determine the fill color based on the level
  const fillColor = getFillColor(level);

  return (
    <div className="thermometer-component">
      {/* Decrease Button */}
      <button onClick={handleDecrease} disabled={readonly || level === 0} className="control-button">
        -
      </button>

      {/* Thermometer Display */}
      <div className="thermometer-outer">
        <div
          className="thermometer-fill"
          style={{
            height: fillHeight,
            backgroundColor: fillColor,
          }}
        ></div>
        <div className="thermometer-level-text">
          {level}
        </div>
      </div>

      {/* Increase Button */}
      <button onClick={handleIncrease} disabled={readonly || level === 10} className="control-button">
        +
      </button>
    </div>
  );
}

export default Thermometer;
