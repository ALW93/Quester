import React from "react";
import { useSelector } from "react-redux";
import { parseLevel } from "../services/levels";
import { LinearProgress } from "@material-ui/core";

const Homepage = () => {
  const info = useSelector((state) => state.auth.user);
  const avatar = useSelector((state) => state.avatar.avatar);

  return (
    <>
      <h1>Homepage</h1>
      <div>
        {info.username} lv.{parseLevel(info.exp)}
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={info.health}
        />
        currency: {info.currency}
      </div>
      <div>
        <h2>Avatar</h2>
        Hair: {avatar.hair}, Face: {avatar.face}, Body: {avatar.body}
      </div>
    </>
  );
};

export default Homepage;
