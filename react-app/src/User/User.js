import React from "react";
import "./User.css";
import { parseLevel } from "../services/levels";
import { useSelector } from "react-redux";
import { coinIcon } from "../assets/icons";
import girl_1 from "../characters/girl_1.png";
import boy_1 from "../characters/boy_1.png";
import animal_1 from "../characters/animal_1.png";
import Stats from "./Stats";
import HealthBar from "../Shared/HealthBar";

const User = () => {
  const info = useSelector((state) => state.session.user);
  const avatar = useSelector((state) => state.avatar.avatar);

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

        <HealthBar health={info.health} />
        <div>{info.exp} exp</div>

        <Stats />
      </div>
    </>
  );
};

export default User;
