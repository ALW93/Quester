import React from "react";
import "./Damage.css";

const Damage = ({ message, showDamage }) => {
  return (
    <div className="damage__notice">
      <div>{message}</div>
      <button onClick={() => showDamage(false)}>Dismiss</button>
    </div>
  );
};

export default Damage;
