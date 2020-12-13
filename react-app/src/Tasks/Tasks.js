import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Damage from "../Shared/Damage";
import Reward from "../Shared/Reward";
import "./Tasks.css";
import CompleteTask from "./CompleteTask";
import ExpiredTask from "./ExpiredTask";

const Tasks = () => {
  const data = useSelector((state) => state.tasks.allTasks);
  const expired = useSelector((state) => state.tasks.expired);
  const complete = useSelector((state) => state.tasks.complete);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(true);
  const [damage, showDamage] = useState(false);
  const [reward, showReward] = useState(false);

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
        <>
          {complete &&
            complete.map((c) => {
              return <CompleteTask data={c} />;
            })}
        </>
      ) : (
        <>
          {reward ? <Reward rewards={reward} showReward={showReward} /> : null}
          {damage ? <Damage message={damage} showDamage={showDamage} /> : null}

          {tasks &&
            tasks.map((t) => {
              return (
                <Task
                  t={t}
                  setTasks={setTasks}
                  showDamage={showDamage}
                  showReward={showReward}
                />
              );
            })}
          {expired &&
            expired.map((e) => {
              return <ExpiredTask data={e} />;
            })}
        </>
      )}
    </div>
  );
};

export default Tasks;
