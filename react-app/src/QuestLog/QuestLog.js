import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./QuestLog.css";
import Habit from "../Dailies/Habit";
import Task from "../Tasks/Tasks";
import Social from "../Social/Social";

const QuestLog = () => {
  const [showQ, setShowQ] = useState(false);
  const [showD, setShowD] = useState(true);
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
    <>
      <div>
        <Button variant="outlined" onClick={toggleQuest}>
          Quests
        </Button>
        <Button variant="outlined" onClick={toggleDaily}>
          Dailies
        </Button>
        <Button variant="outlined" onClick={toggleSocial}>
          Social
        </Button>
      </div>
      <div className="questlog__page">
        {showQ ? <Task /> : null}
        {showD ? <Habit /> : null}
        {showS ? <Social /> : null}
      </div>
    </>
  );
};

export default QuestLog;
