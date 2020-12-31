import React from "react";

const HealthBar = ({ health }) => {
  const barColor = () => {
    if (health <= 25) return "pink";
    if (health <= 50) return "orange";
    return "rgb(137, 210, 191)";
  };

  return (
    <div className="progress" style={{ height: "40px" }}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{
          width: `${health}%`,
          backgroundColor: `${barColor()}`,
        }}
      >
        {health}/100 HP
      </div>
    </div>
  );
};

export default HealthBar;
