import React from "react";
import { parseDifficulty, parseClass } from "../services/levels";
import { Button, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { removeComplete } from "../store/actions/tasksReducer";
import { deleteIcon } from "../assets/icons";

const CompleteTask = ({ data }) => {
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    console.log(data.id);
    await dispatch(removeComplete(data.id));
  };
  return (
    <>
      {/* <Paper className={`task ${parseClass(t.difficulty)}`}> */}
      <Paper className="task">
        <div className="task__title">
          <div style={{ display: "flex" }}>
            <h1 style={{ marginRight: "10px" }}>{data.name}</h1>
            <div>{parseDifficulty(data.difficulty)}</div>
          </div>
          <Button onClick={deleteHandler}>{deleteIcon()}</Button>
        </div>
      </Paper>
    </>
  );
};

export default CompleteTask;
