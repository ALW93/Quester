import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Task from "./Task";
import "./Tasks.css";

const Tasks = () => {
  const id = useSelector((state) => state.auth.userId);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${id}/tasks`);
      const data = await response.json();
      console.log(data);
      setTasks(data.tasks);
    })();
  }, []);

  const renderTasks = tasks.map((t) => {
    return (
      <>
        <ul className="task">
          <Task t={t} />
        </ul>
      </>
    );
  });

  return (
    <>
      <h1>Tasks</h1>
      <div>
        <Button variant="outlined">Add Task</Button>
        <Button variant="outlined">Edit Categories</Button>
      </div>
      <div>{renderTasks}</div>
    </>
  );
};

export default Tasks;
