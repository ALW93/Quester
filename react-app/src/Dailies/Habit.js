import React from "react";
import { Button } from "@material-ui/core";

const Habit = () => {
  return (
    <>
      <h1>Habits</h1>
      <div>
        <Button variant="outlined">Add Daily</Button>
        <Button variant="outlined">Edit Categories</Button>
      </div>
    </>
  );
};

export default Habit;
