import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

const Tasks = () => {
  useEffect(() => {
    //
  });

  return (
    <>
      <h1>Tasks</h1>
      <div>
        <Button variant="outlined">Add Task</Button>
        <Button variant="outlined">Edit Categories</Button>
      </div>
    </>
  );
};

export default Tasks;
