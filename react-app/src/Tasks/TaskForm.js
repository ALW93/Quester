import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const TaskForm = () => {
  return (
    <>
      <h1>TASK FORM</h1>
      <form>
        <div>
          <TextField placeholder="Title" />
        </div>
        <div>
          <TextField placeholder="Difficulty" />
        </div>
        <div>
          <TextField placeholder="Deadline" />
        </div>
        <div>
          <TextField placeholder="Frequency" />
        </div>
        <Button>Submit</Button>
        <Button>Cancel</Button>
      </form>
    </>
  );
};

export default TaskForm;
