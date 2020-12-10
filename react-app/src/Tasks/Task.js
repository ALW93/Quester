import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import "./Tasks.css";
import Category from "../Shared/Category";
import { useDispatch } from "react-redux";
import { parseDifficulty } from "../services/levels";
import { getTaskCategory } from "../store/actions/tasksReducer";
import { removeTask } from "../store/actions/tasksReducer";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const Task = ({ t, setTasks }) => {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [deleteTask, setDeleteTask] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cats = await dispatch(getTaskCategory(t.id));
      await setCategories(cats);
      setLoaded(true);
    })();
  }, [t]);

  const deleteHandler = async () => {
    console.log("hitting");
    await dispatch(removeTask(t.id));
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Paper className="task">
        <div className="task__title">
          <h1>{t.name}</h1>
          <div>
            <h1>hard</h1>
            {parseDifficulty(t.difficulty)}
          </div>
        </div>

        <li>repeat: {t.frequency}</li>
        <li>status: {t.status}</li>
        {t.deadline ? (
          <li>Expires In: {t.deadline}</li>
        ) : (
          <li>No Expiration</li>
        )}
        {categories &&
          categories.map((c, i) => {
            return <Category data={c} key={`TaskCategory${i}`} />;
          })}
        <div>
          {/* <Button variant="contained" color="primary">
          Edit
        </Button> */}
          <Button onClick={deleteHandler}>
            <DeleteOutlineIcon style={{ fill: "red" }} />
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default Task;
