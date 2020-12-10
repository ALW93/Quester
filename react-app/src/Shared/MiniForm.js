import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Select, MenuItem } from "@material-ui/core";

export const MiniForm = ({ num }) => {
  const user = useSelector((state) => state.session.user);
  const stats = useSelector((state) => state.stats.stats);
  const [mini, setMini] = useState(false);
  const [name, setName] = useState("");
  const [stat, setStat] = useState(0);

  const submitHandler = () => {
    const new_category = {
      userId: user.id,
      name: name,
      statId: stat,
    };
    console.log(new_category);
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
        />
        <Select onChange={updateStat}>
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
