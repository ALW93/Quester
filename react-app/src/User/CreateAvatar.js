import React, { useState } from "react";
import { Select, MenuItem, Button } from "@material-ui/core";
import "./CreateAvatar.css";

const CreateAvatar = ({ prebuilt, setPrebuilt, onSignUp }) => {
  const updatePrebuilt = (e) => {
    setPrebuilt(e.target.value);
  };
  const selections = ["girl_1", "animal_1", "boy_1"];

  return (
    <div className="creation__container">
      <h1>Select a Character</h1>
      <form onSubmit={onSignUp}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {selections.map((e) => {
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
          })}
        </div>
        <Select value={prebuilt} onChange={updatePrebuilt}>
          <MenuItem value="girl_1">girl</MenuItem>
          <MenuItem value="boy_1">boy</MenuItem>
          <MenuItem value="animal_1">animal</MenuItem>
        </Select>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CreateAvatar;
