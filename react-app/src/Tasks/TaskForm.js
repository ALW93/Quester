import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Tasks.css";
import { DateTime } from "luxon";
import { questIcon } from "../assets/icons";
import { TextField, Select, MenuItem } from "@material-ui/core";
import { newTask, getTasks } from "../store/actions/tasksReducer";

const TaskForm = ({ setTaskForm, setTasks }) => {
  const user = useSelector((state) => state.session.user);
  const cats = useSelector((state) => state.categories.categories);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [deadline, setDeadline] = useState(null);
  const [frequency, setFrequency] = useState("Once");
  const [cat1, setCat1] = useState("");
  const [cat2, setCat2] = useState("");
  const [newtask, setNewTask] = useState({});
  const dispatch = useDispatch();

  const taskSubmit = async (e) => {
    e.preventDefault();
    const catIds = [];
    if (cat1) catIds.push(cat1);
    if (cat2) catIds.push(cat2);

    const new_task = {
      name: name,
      difficulty: parseInt(difficulty),
      deadline: deadline,
      frequency: frequency,
      status: "pending",
      categories: catIds,
    };
    await setNewTask(new_task);
    setTaskForm(false);
  };

  useEffect(() => {
    (async () => {
      setCategories(cats);
      setName(`${user.username}'s Quest`);
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
    const current = DateTime.local();
    const chosen = DateTime.fromISO(e.target.value);
    if (chosen <= current) {
      alert("Deadline must be later than current time!");
      return;
    }
    setDeadline(e.target.value);
  };

  const updateFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const updateCat1 = (e) => {
    if ([cat1, cat2].includes(e.target.value)) {
      alert("Category already selected!");
      setCat1("");
      return;
    }
    setCat1(e.target.value);
  };

  const updateCat2 = (e) => {
    if ([cat1, cat2].includes(e.target.value)) {
      alert("Category already selected!");
      setCat2("");
      return;
    }
    setCat2(e.target.value);
  };

  return (
    <>
      <div className="taskform__new">
        <div>
          <h1>New Quest</h1>
          {questIcon()}
        </div>
        <form onSubmit={taskSubmit} style={{ display: "flex" }}>
          <div>
            <div>
              Title
              <TextField
                type="text"
                fullWidth={true}
                placeholder={name}
                variant="filled"
                onChange={updateName}
              />
            </div>
            <div>
              Select Difficulty
              <TextField
                select
                variant="filled"
                fullWidth={true}
                onChange={updateDifficulty}
                value={difficulty}
              >
                <MenuItem value={1}>⭐</MenuItem>
                <MenuItem value={2}>⭐ ⭐ </MenuItem>
                <MenuItem value={3}>⭐ ⭐ ⭐ </MenuItem>
                <MenuItem value={4}>⭐ ⭐ ⭐ ⭐ </MenuItem>
                <MenuItem value={5}>⭐ ⭐ ⭐ ⭐ ⭐ </MenuItem>
              </TextField>
            </div>

            <div>
              Deadline
              <TextField
                variant="filled"
                fullWidth={true}
                type="datetime-local"
                onChange={updateDeadline}
                value={deadline}
              />
            </div>
          </div>
          <div style={{ marginLeft: "50px" }}>
            <div style={{ marginBottom: "20px" }}>
              Category
              <TextField
                label="Category"
                fullWidth={true}
                variant="filled"
                onChange={updateName}
                InputLabelProps={{
                  shrink: true,
                }}
                select
                onChange={updateCat1}
                value={cat1}
              >
                <MenuItem>--</MenuItem>
                {categories &&
                  categories.map((e) => {
                    return <MenuItem value={e.id}>{e.name}</MenuItem>;
                  })}
              </TextField>
              {"  "}
              Category
              <TextField
                fullWidth={true}
                label="Category"
                variant="filled"
                onChange={updateName}
                InputLabelProps={{
                  shrink: true,
                }}
                select
                onChange={updateCat2}
                value={cat2}
              >
                {categories &&
                  categories.map((e) => {
                    return <MenuItem value={e.id}>{e.name}</MenuItem>;
                  })}
              </TextField>
            </div>

            <button type="submit" className="fadebutton">
              SUBMIT
            </button>
            {"  "}
            <button onClick={() => setTaskForm(false)} className="fb2">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
