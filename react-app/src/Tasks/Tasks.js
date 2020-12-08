import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Task from "./Task";
import TaskForm from "./TaskForm";
import "./Tasks.css";
import CategoryForm from "../Shared/CategoryForm";
import { useDispatch } from "react-redux";

const Tasks = () => {
  const user = useSelector((state) => state.session.user);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(true);
  const [catForm, setCatForm] = useState(false);

  useEffect(() => {
    (async () => {})();
  }, []);

  const showTaskForm = (open) => {
    setTaskForm(open);
  };

  const showCatForm = (open) => {
    setCatForm(open);
  };

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
        <Button
          variant="outlined"
          onClick={() => {
            showTaskForm(true);
            showCatForm(false);
          }}
        >
          Add Task
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            showCatForm(true);
            showTaskForm(false);
          }}
        >
          Edit Categories
        </Button>
      </div>
      {taskForm ? <TaskForm setTaskForm={setTaskForm} /> : null}
      {catForm ? <CategoryForm /> : null}
      <div>{renderTasks}</div>
    </>
  );
};

export default Tasks;
