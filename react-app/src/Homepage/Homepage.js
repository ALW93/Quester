import React from "react";
import "./Homepage.css";
import User from "../User/User";
import QuestLog from "../QuestLog/QuestLog";
import LogoutButton from "../Shared/LogoutButton";
import Clock from "../Shared/Clock";
import Alert from "../Shared/Alert";

const Homepage = () => {
  return (
    <>
      <div className="homepage__topbar">
        <Clock />
        <div className="homepage__logo">
          <h1>Quester</h1>
          <p>Productivity RPG Adventure</p>
        </div>
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
      <Alert />
    </>
  );
};

export default Homepage;
