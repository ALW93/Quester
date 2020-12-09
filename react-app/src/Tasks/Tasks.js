import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Task from "./Task";
import TaskForm from "./TaskForm";
import "./Tasks.css";
import CategoryForm from "../Shared/CategoryForm";

const Tasks = () => {
  const data = useSelector((state) => state.tasks.allTasks);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(false);
  const [catForm, setCatForm] = useState(false);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const showTaskForm = (open) => {
    setTaskForm(open);
  };

  const showCatForm = (open) => {
    setCatForm(open);
  };

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
      {taskForm ? (
        <TaskForm setTaskForm={setTaskForm} setTasks={setTasks} />
      ) : null}
      {catForm ? <CategoryForm /> : null}
      {tasks &&
        tasks.map((t) => {
          return (
            <div className="task">
              <Task t={t} />
            </div>
          );
        })}
    </>
  );
};

export default Tasks;
