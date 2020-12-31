import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newCategory } from "../store/actions/categoryReducer";
import { TextField, MenuItem } from "@material-ui/core";
import { setUpdate } from "../store/actions/utilityReducer";

export const MiniForm = ({ num }) => {
  const user = useSelector((state) => state.session.user);
  const stats = useSelector((state) => state.stats.stats);
  const dispatch = useDispatch();
  const [mini, setMini] = useState(false);
  const [name, setName] = useState("");
  const [stat, setStat] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const new_category = {
      name: name,
      stat_id: stat,
    };
    await dispatch(newCategory(user.id, new_category));
    setName("");
    setStat("");
    setMini(false);
    await dispatch(
      setUpdate({ type: "Success", message: "Added New Category!" })
    );
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
          type="text"
          fullWidth={true}
          placeholder={name}
          variant="filled"
          onChange={updateName}
          value={name}
        />
        <div>Stat</div>
        <TextField
          type="text"
          fullWidth={true}
          placeholder={name}
          variant="filled"
          select
          onChange={updateStat}
          value={stat}
        >
          {stats &&
            stats.map((s) => {
              return <MenuItem value={s.id}>{s.name}</MenuItem>;
            })}
        </TextField>
        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
          <button onClick={() => setMini(false)}>Cancel</button>
        </div>
      </form>
    );
  };

  const addTask = () => {
    return (
      <button
        className="fadebutton"
        onClick={() => setMini(true)}
        style={{ marginTop: "25px" }}
      >
        ADD CATEGORY
      </button>
    );
  };

  return <>{mini ? miniForm() : addTask()}</>;
};
