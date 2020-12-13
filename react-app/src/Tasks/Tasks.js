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

  const [log, setLog] = useState(false);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const toggleLog = (open) => {
    setLog(open);
  };

  const showTaskForm = (open) => {
    setTaskForm(open);
  };

  return (
    <div className="taskpage__container">
      <div>
        <Button variant="outlined" onClick={() => toggleLog(false)}>
          Active
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            showTaskForm(true);
          }}
        >
          Add Task
        </Button>

        <Button variant="outlined" onClick={() => toggleLog(true)}>
          Log
        </Button>
      </div>
      {taskForm ? (
        <TaskForm setTaskForm={setTaskForm} setTasks={setTasks} />
      ) : null}

      {log ? (
        <h1>Log Items will Go Here</h1>
      ) : (
        tasks &&
        tasks.map((t) => {
          return <Task t={t} setTasks={setTasks} />;
        })
      )}
    </div>
  );
};

export default Tasks;
