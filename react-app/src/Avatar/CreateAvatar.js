import React from "react";
import { parseLevel } from "../services/levels";
import { useSelector } from "react-redux";
import { LinearProgress, Select, MenuItem, Button } from "@material-ui/core";

const CreateAvatar = () => {
  const info = useSelector((state) => state.auth.user);
  return (
    <>
      <h1>Create Character</h1>
      <div>
        {info.username} lv.{parseLevel(info.exp)}
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={info.health}
        />
      </div>
      <form>
        <Select>
          <MenuItem value="hair_1">hair_1</MenuItem>
          <MenuItem value="hair_2">hair_2</MenuItem>
          <MenuItem value="hair_3">hair_3</MenuItem>
        </Select>
        <Select>
          <MenuItem value="face_1">face_1</MenuItem>
          <MenuItem value="face_2">face_2</MenuItem>
          <MenuItem value="face_3">face_3</MenuItem>
        </Select>
        <Select>
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
