import React, { useState, useEffect } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getHabits, newHabit } from "../store/actions/habitReducer";
import "./Habit.css";

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
      categories: Array.from(habitcat),
    };
    setNewHabit(new_habit);
  };

  useEffect(() => {
    (async () => {
      setCategories(cats);
      setName(`${user.username}'s New Task`);
    })();
  }, [user, cats]);

  useEffect(() => {
    (async () => {
      await dispatch(newHabit(user.id, newhabit));
      await setHabits(dispatch(getHabits(user.id)));
    })();
  }, [newhabit]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="habitform__container">
      <form onSubmit={habitSubmit}>
        <h1>New Daily</h1>
        <div>Name</div>
        <TextField placeholder={name} onChange={updateName} />
        <div>
          <button type="submit">Submit</button>
          <button onClick={() => setHabitForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
