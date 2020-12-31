import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./QuestLog.css";
import Habit from "../Dailies/Habit";
import Task from "../Tasks/Tasks";
import Social from "../Social/Social";
import Settings from "../Settings/Settings";
import { swordIcon, fantasyIcon, hatIcon, bookIcon } from "../assets/icons";

const QuestLog = () => {
  const [showQ, setShowQ] = useState(false);
  const [showD, setShowD] = useState(true);
  const [showS, setShowS] = useState(false);
  const [settings, showSettings] = useState(false);

  const toggleQuest = () => {
    setShowQ(true);
    setShowD(false);
    setShowS(false);
    showSettings(false);
  };

  const toggleDaily = () => {
    setShowQ(false);
    setShowD(true);
    setShowS(false);
    showSettings(false);
  };

  const toggleSocial = () => {
    setShowQ(false);
    setShowD(false);
    setShowS(true);
    showSettings(false);
  };

  const toggleSettings = () => {
    showSettings(true);
    setShowQ(false);
    setShowD(false);
    setShowS(false);
  };

  return (
    <div className="questlog__page--top">
      <div>
        <button onClick={toggleQuest} className="fadebutton">
          {swordIcon()}
          Quests
        </button>
        <button onClick={toggleDaily} className="fadebutton">
          {bookIcon()}
          Dailies
        </button>
        <button onClick={toggleSocial} className="fadebutton">
          {hatIcon()}
          Social
        </button>
        <button onClick={toggleSettings} className="fadebutton">
          {fantasyIcon()}
          Settings
        </button>
      </div>
      <div className="questlog__page--bottom">
        {showQ ? <Task /> : null}
        {showD ? <Habit /> : null}
        {showS ? <Social /> : null}
        {settings ? <Settings /> : null}
      </div>
    </div>
  );
};

export default QuestLog;
