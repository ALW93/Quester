import React, { useEffect, useState } from "react";
import "./User.css";
import { parseLevel } from "../services/levels";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Stats from "./Stats";

const User = () => {
  const info = useSelector((state) => state.session.user);
  const update = useSelector((state) => state.utility.update);
  const [showUpdate, hideShowUpdate] = useState(true);

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
      <div>
        <h1>
          {info.username} lv.{parseLevel(info.exp)}
        </h1>
      </div>
      <div>currency: {info.currency}</div>

      {showUpdate ? (
        <>
          <div className="tester">Good Work!</div>
        </>
      ) : null}
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
