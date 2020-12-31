import React, { useState } from "react";
import { removeExpired, restoreTask } from "../store/actions/tasksReducer";
import { Paper, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { setUpdate } from "../store/actions/utilityReducer";
import { parseDifficulty } from "../services/levels";
import "./Tasks.css";

const ExpiredTask = ({ data }) => {
  const dispatch = useDispatch();
  const [form, showForm] = useState(false);
  const [deadline, setDeadline] = useState();

  const reviveHandler = async () => {
    const payload = { deadline: deadline || null };
    await dispatch(restoreTask(data.id, payload));
  };

  const deleteHandler = async () => {
    await dispatch(removeExpired(data.id));
  };

  const updateDeadline = (e) => {
    const current = DateTime.local();
    const chosen = DateTime.fromISO(e.target.value);
    if (chosen <= current) {
      return dispatch(
        setUpdate({
          type: "Warning",
          message: "Deadline must be later than current time!",
        })
      );
    }
    setDeadline(e.target.value);
  };

  const reviveForm = () => {
    return (
      <div>
        <h4>Set Deadline *(Leave Blank for No Expiration)</h4>
        <form>
          <TextField
            type="datetime-local"
            onChange={updateDeadline}
            value={deadline}
          />
        </form>
      </div>
    );
  };
  return (
    <>
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

        <div className="restore__task">
          {form ? (
            <div className="revive__form">
              {reviveForm()}
              <div style={{ margin: "5px" }}>
                <button className="fadebutton" onClick={reviveHandler}>
                  Restore Task
                </button>
                {"  "}
                <button className="fb2" onClick={() => showForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => showForm(true)} className="fadebutton">
                TRY AGAIN
              </button>
              {"  "}
              <button className="fb2" onClick={deleteHandler}>
                DELETE
              </button>
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};
export default ExpiredTask;
