import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import "./Tasks.css";
import Category from "../Shared/Category";
import { useDispatch } from "react-redux";
import { parseDifficulty } from "../services/levels";
import { getTaskCategory } from "../store/actions/tasksReducer";
import { removeTask, completeTask } from "../store/actions/tasksReducer";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DateTime from "luxon/src/datetime.js";

const Task = ({ t }) => {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [expired, setExpired] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cats = await dispatch(getTaskCategory(t.id));
      await setCategories(cats);
      setLoaded(true);
    })();
  }, [t]);

  const deleteHandler = async () => {
    await dispatch(removeTask(t.id));
  };

  const completeHandler = async () => {
    await dispatch(completeTask(t.id));
  };

  const timeLeft = () => {
    const now = DateTime.local();
    const expiration = DateTime.fromHTTP(t.deadline);
    const time = expiration.diff(now, ["days", "hours"]).toObject();
    if (time.days < 0) {
      return "Expired";
    }
    return time;
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Paper className="task">
        <div className="task__title">
          <h1>{t.name}</h1>
          <div>{parseDifficulty(t.difficulty)}</div>
        </div>

        {/* <li>repeat: {t.frequency}</li> */}
        <li>status: {t.status}</li>
        {t.deadline ? (
          <>
            <li>
              Time Remaining: {timeLeft().days} Days{"  "}
              {Math.round(timeLeft().hours)} Hours
            </li>
          </>
        ) : (
          <li>No Expiration</li>
        )}
        {categories &&
          categories.map((c, i) => {
            return <Category data={c} key={`TaskCategory${i}`} />;
          })}
        <div>
          <Button onClick={completeHandler} variant="contained" color="primary">
            Complete
          </Button>
          <Button onClick={deleteHandler}>
            <DeleteOutlineIcon style={{ fill: "red" }} />
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default Task;
