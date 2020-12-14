import React, { useEffect, useState } from "react";
import "./User.css";
import { parseLevel } from "../services/levels";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { coinIcon, tempAvatar, expIcon, healthIcon } from "../assets/icons";
import girl from "../characters/sword_girl.png";
import boy from "../characters/bow_boy.png";
import Stats from "./Stats";
import newgirl from "../assets/new_girl.png";
import { closeUpdate } from "../store/actions/utilityReducer";

const User = () => {
  const info = useSelector((state) => state.session.user);
  const update = useSelector((state) => state.utility.update);
  const dispatch = useDispatch();

  return (
    <>
      <div className="User__container">
        <div className="User__currency">
          {coinIcon()}
          <div className="User__gold">
            {info.currency}
            {"  "} Gold
          </div>
        </div>
        <div className="User__topinfo">
          <h1>
            {info.username} lv.{parseLevel(info.exp)}
          </h1>
        </div>

        <img src={newgirl} style={{ width: "95%" }} />

        <div className="progress" style={{ height: "40px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${info.health}%`,
              backgroundColor: "rgb(137, 210, 191)",
            }}
          >
            {info.health}/100 HP
          </div>
        </div>
        <div>{info.exp} exp</div>

        <Stats />
      </div>
    </>
  );
};

export default User;
