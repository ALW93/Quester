import React, { useState } from "react";
import { parseLevel } from "../services/levels";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Select, MenuItem, Button } from "@material-ui/core";
import { setAvatar, createAvatar } from "../store/actions/avatarReducer";

const CreateAvatar = () => {
  const info = useSelector((state) => state.auth.user);
  const [hair, setHair] = useState("");
  const [face, setFace] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const createChar = async (e) => {
    e.preventDefault();
    const new_char = {
      userId: info.id,
      hair: hair,
      face: face,
      body: body,
    };
    const res = await createAvatar(info.id, new_char);

    if (res) {
      dispatch(setAvatar(res));
      history.push("/");
    }
  };

  const updateHair = (e) => {
    setHair(e.target.value);
  };

  const updateFace = (e) => {
    setFace(e.target.value);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  return (
    <>
      <h1>Create Your Character</h1>
      <div>
        {info.username} lv.{parseLevel(info.exp)}
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${info.health}%` }}
          ></div>
        </div>
      </div>
      <form onSubmit={createChar}>
        <Select value={hair} onChange={updateHair}>
          <MenuItem value="hair_1">hair_1</MenuItem>
          <MenuItem value="hair_2">hair_2</MenuItem>
          <MenuItem value="hair_3">hair_3</MenuItem>
        </Select>
        <Select value={face} onChange={updateFace}>
          <MenuItem value="face_1">face_1</MenuItem>
          <MenuItem value="face_2">face_2</MenuItem>
          <MenuItem value="face_3">face_3</MenuItem>
        </Select>
        <Select value={body} onChange={updateBody}>
          <MenuItem value="body_1">body_1</MenuItem>
          <MenuItem value="body_2">body_2</MenuItem>
          <MenuItem value="body_3">body_3</MenuItem>
        </Select>
        <Button type="submit">Create</Button>
      </form>
    </>
  );
};

export default CreateAvatar;
