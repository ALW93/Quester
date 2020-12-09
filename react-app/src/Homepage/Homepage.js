import React from "react";
import "./Homepage.css";
import User from "../User/User";
import QuestLog from "../QuestLog/QuestLog";
import LogoutButton from "../Shared/LogoutButton";

const Homepage = () => {
  return (
    <>
      <div className="homepage__topbar">
        <div>{new Date().toLocaleString()}</div>
        <div>Quester</div>
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
