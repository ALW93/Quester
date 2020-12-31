import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import "./Tasks.css";
import Category from "../Shared/Category";
import { parseDifficulty, parseStarText, parseClass } from "../services/levels";
import { useDispatch, useSelector } from "react-redux";
import { expire, getTaskCategory } from "../store/actions/tasksReducer";
import { removeTask, completeTask } from "../store/actions/tasksReducer";

import { DateTime } from "luxon";
import { gacha } from "../services/gacha";
import { setUserInfo } from "../store/actions/authReducer";
import { getStats } from "../store/actions/statReducer";
import timeIcon from "../assets/hourglass.svg";

const Task = ({ t, showDamage, showReward }) => {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

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

  const completeHandler = async () => {
    const payload = gacha("complete_task", t.difficulty);
    if (categories.length) {
      payload.statId = await categories.map((e) => e.stat_id);
    }

    await dispatch(completeTask(t.id, payload));
    await dispatch(setUserInfo());
    await dispatch(getStats(user.id));
    showReward(payload);
  };

  const deleteHandler = async () => {
    await dispatch(removeTask(t.id));
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      {/* <Paper className={`task ${parseClass(t.difficulty)}`} /> */}
      <Paper className="task">
        <div className="task__title">
          <h1>
            {t.name}
            {parseStarText(t.difficulty)}
          </h1>

          <div>{parseDifficulty(t.difficulty)}</div>
        </div>

        <div className="task__bottom">
          {t.deadline ? (
            <div>
              <img src={timeIcon} style={{ width: "40px" }} /> {time.days} Days
              {"  "}
              {Math.round(time.hours)} Hours
            </div>
          ) : (
            <>No Expiration</>
          )}
          <div style={{ display: "flex" }}>
            {categories &&
              categories.map((c, i) => {
                return <Category data={c} key={`TaskCategory${i}`} />;
              })}
          </div>
          <div>
            <button
              className="fadebutton"
              onClick={completeHandler}
              variant="contained"
              color="primary"
            >
              Complete
            </button>

            <button onClick={deleteHandler} className="fb2">
              Delete
            </button>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Task;
