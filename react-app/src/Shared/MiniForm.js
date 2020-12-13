import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newCategory } from "../store/actions/categoryReducer";
import { Button, TextField, Select, MenuItem } from "@material-ui/core";

export const MiniForm = ({ num }) => {
  const user = useSelector((state) => state.session.user);
  const stats = useSelector((state) => state.stats.stats);
  const dispatch = useDispatch();
  const [mini, setMini] = useState(false);
  const [name, setName] = useState("");
  const [stat, setStat] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    const new_category = {
      name: name,
      stat_id: stat,
    };
    console.log(new_category);
    await dispatch(newCategory(user.id, new_category));
    setName("");
    setStat("");
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateStat = (e) => {
    setStat(e.target.value);
  };

  const miniForm = () => {
    return (
      <form className="category__content" onSubmit={submitHandler}>
        <TextField
          required={true}
          placeholder="Category Name"
          onChange={updateName}
          value={name}
        />
        <Select onChange={updateStat} value={stat}>
          {stats &&
            stats.map((s) => {
              return <MenuItem value={s.id}>{s.name}</MenuItem>;
            })}
        </Select>
        <div>
          <Button type="submit">Submit</Button>
          <Button onClick={() => setMini(false)}>Cancel</Button>
        </div>
      </form>
    );
  };

  const addTask = () => {
    return (
      <Button onClick={() => setMini(true)}>Empty Slot (+) Add Task</Button>
    );
  };

  return <>{mini ? miniForm() : addTask()}</>;
};
