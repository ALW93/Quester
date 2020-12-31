import React, { useState } from "react";
import "./CreateAvatar.css";

const CreateAvatar = ({ prebuilt, setPrebuilt, onSignUp }) => {
  const updatePrebuilt = (e) => {
    setPrebuilt(e.target.getAttribute("value"));
  };
  const selections = ["girl_1", "animal_1", "boy_1"];

  return (
    <div className="creation__container">
      <h1>Select a Hero</h1>
      <form onSubmit={onSignUp}>
        <div className="hero__selector">
          {selections.map((e) => {
            if (e === prebuilt) {
              return (
                <img
                  value={e}
                  onClick={updatePrebuilt}
                  src={require(`../characters/${e}.png`)}
                  style={{
                    width: "400px",
                    height: "100%",
                  }}
                  className="selected"
                />
              );
            } else {
              return (
                <img
                  value={e}
                  onClick={updatePrebuilt}
                  src={require(`../characters/${e}.png`)}
                  style={{
                    width: "400px",
                    height: "100%",
                  }}
                  className="unselected"
                />
              );
            }
          })}
        </div>
        <button className="blue cute" type="submit" style={{ margin: "20px" }}>
          Create Character
        </button>
      </form>
    </div>
  );
};

export default CreateAvatar;
