import React from "react";
import "./Homepage.css";
import User from "../User/User";
import QuestLog from "../QuestLog/QuestLog";
import LogoutButton from "../Shared/LogoutButton";
import Clock from "../Shared/Clock";

const Homepage = () => {
  return (
    <>
      <div className="homepage__topbar">
        <Clock />
        <h1>Quester</h1>
        <LogoutButton />
      </div>
      <div className="homepage__bottom">
        <div className="homepage__bottom-left">
          <User />
        </div>
        <div className="homepage__bottom-right">
          <QuestLog />
        </div>
      </div>
    </>
  );
};

export default Homepage;
