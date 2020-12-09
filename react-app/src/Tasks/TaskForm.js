import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Tasks.css";
import CategorySelector from "../Shared/CategorySelector";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { newTask, getTasks } from "../store/actions/tasksReducer";

const TaskForm = ({ setTaskForm, setTasks }) => {
  const user = useSelector((state) => state.session.user);
  const cats = useSelector((state) => state.categories.categories);
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
    setNewTask(new_task);
  };

  useEffect(() => {
    (async () => {
      setCategories(cats);
      setName(`${user.username}'s New Task`);
    })();
  }, [user, cats]);

  useEffect(() => {
    (async () => {
      await dispatch(newTask(user.id, newtask));
      await setTasks(dispatch(getTasks(user.id)));
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

  const updateCats = (e) => {
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
              <CategorySelector
                categories={categories}
                updateCats={updateCats}
              />
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
