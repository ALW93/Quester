import React, { useEffect, useState } from "react";
import "./User.css";
import { parseLevel } from "../services/levels";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { coinIcon, tempAvatar } from "../assets/icons";
import Stats from "./Stats";

const User = () => {
  const info = useSelector((state) => state.session.user);
  const update = useSelector((state) => state.utility.update);
  const [showUpdate, hideShowUpdate] = useState(false);

  useEffect(() => {
    const statChange = () => {
      setTimeout(() => hideShowUpdate(false), 20000);
    };

    if (update) {
      console.log("stats updating");
      hideShowUpdate(true);
      statChange();
    }
  }, [update]);
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

        {showUpdate ? (
          <>
            <div className="tester">Good Work!</div>
          </>
        ) : null}
        {tempAvatar()}

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
