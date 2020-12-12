import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./QuestLog.css";
import Habit from "../Dailies/Habit";
import Task from "../Tasks/Tasks";
import Social from "../Social/Social";

const QuestLog = () => {
  const [showQ, setShowQ] = useState(true);
  const [showD, setShowD] = useState(false);
  const [showS, setShowS] = useState(false);

  const toggleQuest = () => {
    setShowQ(true);
    setShowD(false);
    setShowS(false);
  };

  const toggleDaily = () => {
    setShowQ(false);
    setShowD(true);
    setShowS(false);
  };

  const toggleSocial = () => {
    setShowQ(false);
    setShowD(false);
    setShowS(true);
  };

  return (
    <div className="questlog__page--top">
      <div>
        <button variant="outlined" onClick={toggleQuest} className="fadebutton">
          Quests
        </button>
        <button variant="outlined" onClick={toggleDaily} className="fadebutton">
          Dailies
        </button>
        <button
          variant="outlined"
          onClick={toggleSocial}
          className="fadebutton"
        >
          Social
        </button>
      </div>
      <div className="questlog__page--bottom">
        {showQ ? <Task /> : null}
        {showD ? <Habit /> : null}
        {showS ? <Social /> : null}
      </div>
    </div>
  );
};

export default QuestLog;
