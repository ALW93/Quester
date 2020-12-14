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
    setMini(false);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateStat = (e) => {
    setStat(e.target.value);
  };

  const miniForm = () => {
    return (
      <form onSubmit={submitHandler}>
        <div>Name</div>
        <TextField
          required={true}
          placeholder="Category Name"
          onChange={updateName}
          value={name}
        />
        <div>Stat</div>
        <Select onChange={updateStat} value={stat}>
          {stats &&
            stats.map((s) => {
              return <MenuItem value={s.id}>{s.name}</MenuItem>;
            })}
        </Select>
        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
          <button onClick={() => setMini(false)}>Cancel</button>
        </div>
      </form>
    );
  };

  const addTask = () => {
    return (
      <button onClick={() => setMini(true)} style={{ marginTop: "25px" }}>
        Add Category
      </button>
    );
  };

  return <>{mini ? miniForm() : addTask()}</>;
};
