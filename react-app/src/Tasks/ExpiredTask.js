import React, { useState } from "react";
import { deleteIcon } from "../assets/icons";
import { removeExpired, restoreTask } from "../store/actions/tasksReducer";
import { Button, Paper, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { parseDifficulty, parseClass } from "../services/levels";

const ExpiredTask = ({ data }) => {
  const dispatch = useDispatch();
  const [form, showForm] = useState(false);
  const [deadline, setDeadline] = useState();

  const reviveHandler = async () => {
    const payload = { deadline: deadline || null };
    console.log(payload);
    await dispatch(restoreTask(data.id, payload));
  };

  const deleteHandler = async () => {
    await dispatch(removeExpired(data.id));
  };

  const updateDeadline = (e) => {
    const current = DateTime.local();
    const chosen = DateTime.fromISO(e.target.value);
    if (chosen <= current) {
      alert("Deadline must be later than current time!");
      return;
    }
    setDeadline(e.target.value);
  };

  const reviveForm = () => {
    return (
      <>
        <div>Set Deadline *(Leave Blank for No Expiration)</div>
        <form>
          <TextField
            type="datetime-local"
            onChange={updateDeadline}
            value={deadline}
          />
        </form>
      </>
    );
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

        {form ? (
          <>
            {reviveForm()}
            <div>
              <Button onClick={reviveHandler}>Restore Task</Button>
              <Button onClick={() => showForm(false)}>Cancel</Button>
            </div>
          </>
        ) : (
          <div>
            <Button onClick={() => showForm(true)} variant="contained">
              Try Again
            </Button>
            <Button onClick={deleteHandler}>{deleteIcon()}</Button>
          </div>
        )}
      </Paper>
    </>
  );
};
export default ExpiredTask;
