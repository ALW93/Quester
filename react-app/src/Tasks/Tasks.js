import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Damage from "../Shared/Damage";
import "./Tasks.css";

const Tasks = () => {
  const data = useSelector((state) => state.tasks.allTasks);
  const expired = useSelector((state) => state.tasks.expired);
  const complete = useSelector((state) => state.tasks.complete);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(false);
  const [damage, showDamage] = useState(false);

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
        <Button variant="contained" onClick={() => toggleLog(false)}>
          Active
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            showTaskForm(true);
          }}
        >
          Add Task
        </Button>

        <Button variant="contained" onClick={() => toggleLog(true)}>
          Log
        </Button>
      </div>
      {taskForm ? (
        <TaskForm setTaskForm={setTaskForm} setTasks={setTasks} />
      ) : null}

      {log ? (
        <h1>Log Items will Go Here</h1>
      ) : (
        <>
          {damage ? <Damage message={damage} showDamage={showDamage} /> : null}

          {tasks &&
            tasks.map((t) => {
              return <Task t={t} setTasks={setTasks} showDamage={showDamage} />;
            })}
          {expired &&
            expired.map((e) => {
              return <div>{JSON.stringify(e)}</div>;
            })}
        </>
      )}
    </div>
  );
};

export default Tasks;
