import React, { useState, useEffect } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getHabits, newHabit } from "../store/actions/habitReducer";

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

  const updateCats = (e) => {
    let arr = [...habitcat, e.target.value];
    if (habitcat.has(e.target.value)) {
      habitcat.delete(e.target.value);
      arr = [...habitcat];
    }
    setHabitCat(new Set(arr));
  };

  return (
    <>
      <div>
        <form onSubmit={habitSubmit}>
          <div>
            <TextField placeholder={name} onChange={updateName} />
          </div>

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HabitForm;
