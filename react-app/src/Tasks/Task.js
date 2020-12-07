import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Category from "../Shared/Category";

const Task = ({ t }) => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/tasks/${t.id}/cat`);
      const data = await response.json();
      setCategories(data.categories);
    })();
  }, []);

  return (
    <>
      <li>{t.name}</li>
      <li>difficulty: {t.difficulty}</li>
      <li>frequency: {t.frequency}</li>
      <li>status: {t.status}</li>
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
