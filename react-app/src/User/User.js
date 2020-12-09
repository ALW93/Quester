import React from "react";
import { parseLevel } from "../services/levels";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import Stats from "./Stats";

const User = () => {
  const info = useSelector((state) => state.session.user);
  return (
    <>
      <div>
        {info.username} lv.{parseLevel(info.exp)}
      </div>
      <div>currency: {info.currency}</div>
      <Avatar />
      <div className="progress">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${info.health}%` }}
        >
          {info.health}/100 HP
        </div>
      </div>
      <div>{info.exp} exp</div>

      <Stats />
    </>
  );
};

export default User;
