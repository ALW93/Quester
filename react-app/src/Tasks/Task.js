import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import "./Tasks.css";
import Category from "../Shared/Category";

import { useDispatch, useSelector } from "react-redux";
import { parseDifficulty, parseClass } from "../services/levels";
import { expire, getTaskCategory } from "../store/actions/tasksReducer";
import { removeTask, completeTask } from "../store/actions/tasksReducer";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DateTime from "luxon/src/datetime.js";
import { gacha } from "../services/gacha";
import { setUserInfo } from "../store/actions/authReducer";
import { getStats } from "../store/actions/statReducer";
import { updateTimer } from "../store/actions/utilityReducer";

const Task = ({ t, showDamage }) => {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const update = useSelector((state) => state.utility.update);

  useEffect(() => {
    (async () => {
      const cats = await dispatch(getTaskCategory(t.id));
      await setCategories(cats);
      setLoaded(true);
    })();
    const timeLeft = async () => {
      const now = DateTime.local();
      const expiration = DateTime.fromHTTP(t.deadline);
      const time = expiration.diff(now, ["days", "hours"]).toObject();
      const payload = gacha("expire_task", t.difficulty);
      if (time.days <= 0 && time.hours <= 0) {
        showDamage(`${t.name} has expired! You lost ${payload.health} HP!`);
        await dispatch(expire(t.id, payload, t));
      }
      setTime(time);
    };
    if (t.deadline !== null) {
      timeLeft();
    }
  }, [t]);

  const deleteHandler = async () => {
    await dispatch(removeTask(t.id));
  };

  const completeHandler = async () => {
    const payload = gacha("complete_task", t.difficulty);
    if (categories.length) {
      payload.statId = await categories.map((e) => e.stat_id);
    }

    await dispatch(completeTask(t.id, payload));
    await dispatch(setUserInfo());
    await dispatch(getStats(user.id));
    await dispatch(updateTimer(payload));
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      {/* <Paper className={`task ${parseClass(t.difficulty)}`}> */}
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
              Time Remaining: {time.days} Days{"  "}
              {Math.round(time.hours)} Hours
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
