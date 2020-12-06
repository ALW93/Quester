import React from "react";
import { useSelector } from "react-redux";
import { parseLevel } from "../services/levels";

const Avatar = () => {
  const info = useSelector((state) => state.auth.user);
  const avatar = useSelector((state) => state.avatar.avatar);

  return (
    <>
      <div>
        {info.username} lv.{parseLevel(info.exp)}
      </div>
      <div>currency: {info.currency}</div>
      <div>
        <h2>Avatar</h2>
        Hair: {avatar.hair}, Face: {avatar.face}, Body: {avatar.body}
      </div>
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
    </>
  );
};

export default Avatar;
