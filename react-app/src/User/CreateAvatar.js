import React from "react";
import "./CreateAvatar.css";

const CreateAvatar = ({ prebuilt, setPrebuilt, onSignUp }) => {
  const updatePrebuilt = (e) => {
    setPrebuilt(e.target.getAttribute("value"));
  };

  return (
    <div className="creation__container">
      <h1>Select a Hero</h1>
      <form onSubmit={onSignUp}>
        <div className="hero__selector">
          {prebuilt === "girl_1" ? (
            <img
              value="girl_1"
              onClick={updatePrebuilt}
              src={require(`../characters/girl_1.png`)}
              style={{
                width: "400px",
                height: "100%",
              }}
              className="selected girl"
            />
          ) : (
            <img
              value="girl_1"
              onClick={updatePrebuilt}
              src={require(`../characters/girl_1.png`)}
              style={{
                width: "400px",
                height: "100%",
              }}
              className="unselected girl"
            />
          )}
          {prebuilt === "animal_1" ? (
            <img
              value="animal_1"
              onClick={updatePrebuilt}
              src={require(`../characters/animal_1.png`)}
              style={{
                width: "400px",
                height: "100%",
              }}
              className="selected kitty"
            />
          ) : (
            <img
              value="animal_1"
              onClick={updatePrebuilt}
              src={require(`../characters/animal_1.png`)}
              style={{
                width: "400px",
                height: "100%",
              }}
              className="unselected kitty"
            />
          )}
        </div>
        <button className="blue cute" type="submit" style={{ margin: "20px" }}>
          Create Character
        </button>
      </form>
    </div>
  );
};

export default CreateAvatar;
