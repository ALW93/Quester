import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Select } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getHabits, newHabit } from "../store/actions/habitReducer";
import "./Habit.css";
import { dailyIcon } from "../assets/icons";

const HabitForm = ({ setHabitForm, setHabits }) => {
  const user = useSelector((state) => state.session.user);
  const cats = useSelector((state) => state.categories.categories);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [habitcat, setHabitCat] = useState(new Set());
  const [newhabit, setNewHabit] = useState({});
  const dispatch = useDispatch();

  const habitSubmit = (e) => {
    e.preventDefault();
    const new_habit = {
      name: name,
      category: habitcat,
    };
    setNewHabit(new_habit);
  };

  useEffect(() => {
    (async () => {
      setCategories(cats);
      setName(`${user.username}'s New Habit`);
    })();
  }, [user, cats]);

  useEffect(() => {
    (async () => {
      await dispatch(newHabit(user.id, newhabit));
      await setHabits(dispatch(getHabits(user.id)));
      setHabitForm(false);
    })();
  }, [newhabit]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateCat = (e) => {
    setHabitCat(e.target.value);
  };

  return (
    <div className="habitform__container">
      <form onSubmit={habitSubmit}>
        {dailyIcon()}
        <h1>New Daily</h1>
        <div>
          <div>Name</div>
          <TextField placeholder={name} onChange={updateName} />
        </div>
        <div>
          <div>Category</div>
          <Select onChange={updateCat} value={habitcat}>
            <MenuItem>--</MenuItem>
            {categories &&
              categories.map((e) => {
                return <MenuItem value={e.id}>{e.name}</MenuItem>;
              })}
          </Select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit" style={{ marginRight: "2px" }}>
            Submit
          </button>
          <button onClick={() => setHabitForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
