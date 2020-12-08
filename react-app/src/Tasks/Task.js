import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Category from "../Shared/Category";
import { useDispatch } from "react-redux";
import { getTaskCategory } from "../store/actions/tasks";

const Task = ({ t }) => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cats = await dispatch(getTaskCategory(t.id));
      setCategories(cats);
    })();
  }, []);

  return (
    <>
      <li>{t.name}</li>
      <li>difficulty: {t.difficulty}</li>
      <li>frequency: {t.frequency}</li>
      <li>status: {t.status}</li>
      {t.deadline ? <li>deadline: {t.deadline}</li> : <li>No Deadline</li>}
      {categories &&
        categories.map((c) => {
          return <Category data={c} />;
        })}
      <div>
        <Button variant="contained" color="primary">
          Edit
        </Button>
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      </div>
    </>
  );
};

export default Task;
