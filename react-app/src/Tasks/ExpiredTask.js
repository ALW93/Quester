import React from "react";
import { deleteIcon } from "../assets/icons";
import { removeExpired, restoreTask } from "../store/actions/tasksReducer";
import { Button, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { parseDifficulty, parseClass } from "../services/levels";

const ExpiredTask = ({ data }) => {
  const dispatch = useDispatch();

  const reviveHandler = async () => {
    console.log("trying quest again!");
    await dispatch(restoreTask(data.id));
  };

  const deleteHandler = async () => {
    await dispatch(removeExpired(data.id));
  };
  return (
    <>
      {/* <Paper className={`task ${parseClass(t.difficulty)}`}> */}
      <Paper className="expired__task">
        <div className="task__title">
          <h1 style={{ textDecoration: "line-through", filter: "blur(2px)" }}>
            {data.name}
          </h1>
          <h1 style={{ color: "darkred", WebkitTextStroke: "1px red" }}>
            Quest Failed
          </h1>
          <div>{parseDifficulty(data.difficulty)}</div>
        </div>

        <div>
          <Button onClick={reviveHandler} variant="contained">
            Try Again
          </Button>

          <Button onClick={deleteHandler}>{deleteIcon()}</Button>
        </div>
      </Paper>
    </>
  );
};
export default ExpiredTask;
