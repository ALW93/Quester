import React from "react";
import "./User.css";
import { parseLevel } from "../services/levels";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import Stats from "./Stats";

const User = () => {
  const info = useSelector((state) => state.session.user);
  return (
    <>
      <div>
        <h1>
          {info.username} lv.{parseLevel(info.exp)}
        </h1>
      </div>
      <div>currency: {info.currency}</div>
      <img src="https://i.gyazo.com/7a8d38a048fc6f1c04c6e5eb995447a0.png" />

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
