import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Category from "../Shared/Category";
import { useDispatch } from "react-redux";
import { parseDifficulty } from "../services/levels";
import { getTaskCategory } from "../store/actions/tasksReducer";
import { BlockLoading } from "react-loadingg";

const Task = ({ t }) => {
  const [categories, setCategories] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cats = await dispatch(getTaskCategory(t.id));
      await setCategories(cats);
      setLoaded(true);
    })();
  }, [t]);

  if (!loaded) {
    return <BlockLoading />;
  }

  return (
    <>
      <li>{t.name}</li>
      <li>difficulty: {parseDifficulty(t.difficulty)}</li>
      <li>repeat: {t.frequency}</li>
      <li>status: {t.status}</li>
      {t.deadline ? <li>deadline: {t.deadline}</li> : <li>No Deadline</li>}
      {categories &&
        categories.map((c, i) => {
          return <Category data={c} key={`TaskCategory${i}`} />;
        })}
      <div>
        {/* <Button variant="contained" color="primary">
          Edit
        </Button> */}
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      </div>
    </>
  );
};

export default Task;
