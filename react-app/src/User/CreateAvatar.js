import React, { useState } from "react";
import { parseLevel } from "../services/levels";
import { Select, MenuItem, Button } from "@material-ui/core";
import "./CreateAvatar.css";

const CreateAvatar = ({ prebuilt, setPrebuilt, onSignUp }) => {
  const updatePrebuilt = (e) => {
    setPrebuilt(e.target.value);
  };

  return (
    <div className="creation__container">
      <h1>Select a Character</h1>
      <form onSubmit={onSignUp}>
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
