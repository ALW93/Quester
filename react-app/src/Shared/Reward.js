import React from "react";
import { coinIcon, tempAvatar, expIcon, healthIcon } from "../assets/icons";
import "./Reward.css";

const Reward = ({ rewards, showReward }) => {
  return (
    <>
      <div className="reward__notice">
        <h1>Rewards</h1>
        <div>
          {expIcon()} {rewards.exp} EXP
        </div>
        <div>
          {coinIcon()} {rewards.currency} Gold
        </div>
        <div>
          {healthIcon()} {rewards.health} HP
        </div>
        <button onClick={() => showReward(false)}>Collect</button>
      </div>
    </>
  );
};

export default Reward;
