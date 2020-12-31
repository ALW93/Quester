import React, { useEffect, useState } from "react";
import "./User.css";
import { parseLevel } from "../services/levels";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { coinIcon, tempAvatar, expIcon, healthIcon } from "../assets/icons";
import girl_1 from "../characters/girl_1.png";
import boy_1 from "../characters/boy_1.png";
import animal_1 from "../characters/animal_1.png";
import Stats from "./Stats";

const User = () => {
  const info = useSelector((state) => state.session.user);
  const avatar = useSelector((state) => state.avatar.avatar);
  console.log(avatar);

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
        {avatar.prebuilt === "animal_1" ? (
          <img src={animal_1} style={{ width: "95%" }} />
        ) : null}
        {avatar.prebuilt === "boy_1" ? (
          <img src={boy_1} style={{ width: "95%" }} />
        ) : null}
        {avatar.prebuilt === "girl_1" ? (
          <img src={girl_1} style={{ width: "95%" }} />
        ) : null}

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
