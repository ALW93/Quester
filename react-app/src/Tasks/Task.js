import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import "./Tasks.css";
import Category from "../Shared/Category";
import { useDispatch, useSelector } from "react-redux";
import { parseDifficulty } from "../services/levels";
import { getTaskCategory } from "../store/actions/tasksReducer";
import { removeTask, completeTask } from "../store/actions/tasksReducer";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DateTime from "luxon/src/datetime.js";
import { gacha } from "../services/gacha";
import { authenticate, setUserInfo } from "../store/actions/authReducer";

const Task = ({ t }) => {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState({});
  const [expired, setExpired] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      const cats = await dispatch(getTaskCategory(t.id));
      await setCategories(cats);
      setLoaded(true);
    })();
    const timeLeft = () => {
      const now = DateTime.local();
      const expiration = DateTime.fromHTTP(t.deadline);
      const time = expiration.diff(now, ["days", "hours"]).toObject();
      if (time.days < 0) {
        // alert(`${t.name} has expired! You lost 10 HP!`);
        setExpired(true);
      }
      setTime(time);
    };
    timeLeft();
  }, [t]);

  const deleteHandler = async () => {
    await dispatch(removeTask(t.id));
  };

  const completeHandler = async () => {
    const payload = gacha("complete_task", t.difficulty);
    if (categories.length) {
      payload.statId = await categories.map((e) => e.stat_id);
    }

    // alert(
    //   `Rewards: Gained ${payload.exp} EXP! Earned ${payload.currency} coins! Healed for ${payload.health} pts!`
    // );
    await dispatch(completeTask(t.id, payload));
    dispatch(setUserInfo());
    console.log(user);
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
              {expired ? (
                "Quest Failed"
              ) : (
                <>
                  Time Remaining: {time.days} Days{"  "}
                  {Math.round(time.hours)} Hours
                </>
              )}
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
          {expired ? (
            <Button>Try Again</Button>
          ) : (
            <Button
              onClick={completeHandler}
              variant="contained"
              color="primary"
            >
              Complete
            </Button>
          )}
          <Button onClick={deleteHandler}>
            <DeleteOutlineIcon style={{ fill: "red" }} />
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default Task;
