import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Tasks.css";
import Category from "../Shared/Category";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getCategories, newTask } from "../store/actions/tasks";

const TaskForm = ({ setTaskForm }) => {
  const user = useSelector((state) => state.session.user);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [deadline, setDeadline] = useState(null);
  const [frequency, setFrequency] = useState("Once");
  const [taskcat, setTaskCat] = useState(new Set());
  const [newtask, setNewTask] = useState({});
  const dispatch = useDispatch();

  const taskSubmit = (e) => {
    e.preventDefault();
    const new_task = {
      name: name,
      difficulty: parseInt(difficulty),
      deadline: deadline,
      frequency: frequency,
      status: "pending",
      categories: Array.from(taskcat),
    };
    console.log(new_task);
    setNewTask(new_task);
  };

  useEffect(() => {
    (async () => {
      const categories = await dispatch(getCategories(user.id));
      setCategories(categories);
      setName(`${user.username}'s New Task`);
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      await dispatch(newTask(user.id, newtask));
    })();
  }, [newtask]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const updateDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const updateFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const updateTaskCat = (e) => {
    let arr = [...taskcat, e.target.value];
    if (taskcat.has(e.target.value)) {
      taskcat.delete(e.target.value);
      arr = [...taskcat];
    }
    setTaskCat(new Set(arr));
  };

  return (
    <>
      <div className="taskform__new">
        <form onSubmit={taskSubmit}>
          <div>
            <TextField placeholder={name} onChange={updateName} />
          </div>
          <div>
            <Select onChange={updateDifficulty}>
              <MenuItem value={1}>⭐</MenuItem>
              <MenuItem value={2}>⭐ ⭐ </MenuItem>
              <MenuItem value={3}>⭐ ⭐ ⭐ </MenuItem>
              <MenuItem value={4}>⭐ ⭐ ⭐ ⭐ </MenuItem>
              <MenuItem value={5}>⭐ ⭐ ⭐ ⭐ ⭐ </MenuItem>
            </Select>
          </div>
          <div>
            <TextField type="datetime-local" onChange={updateDeadline} />
          </div>
          <div>
            <div>Frequency</div>
            <Select onChange={updateFrequency} value={frequency}>
              <MenuItem value={"Once"}>Once</MenuItem>
              <MenuItem value={"Daily"}>Daily</MenuItem>
              <MenuItem value={"Every Other Day"}>Every Other Day</MenuItem>
              <MenuItem value={"Weekly"}>Weekly</MenuItem>
            </Select>
          </div>
          <div>
            <FormControl>
              {categories &&
                categories.map((c) => {
                  return (
                    <>
                      <div>
                        <Checkbox value={c.id} onChange={updateTaskCat} />{" "}
                        <Category data={c} />
                      </div>
                    </>
                  );
                })}
            </FormControl>
          </div>
          <Button type="submit">Submit</Button>
          <Button onClick={() => setTaskForm(false)}>Cancel</Button>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
