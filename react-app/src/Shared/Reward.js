import React from "react";
import { coinIcon, expIcon, healthIcon } from "../assets/icons";
import "./Reward.css";

const Reward = ({ rewards, showReward }) => {
  return (
    <>
      <div className="reward__notice">
        <div className="reward__inner">
          <h1>Rewards</h1>
          <div className="reward__detail">
            <div>
              {expIcon()} {rewards.exp} EXP
            </div>
            <div>
              {coinIcon()} {rewards.currency} Gold
            </div>
            <div>
              {healthIcon()} {rewards.health} HP
            </div>
          </div>
          <button onClick={() => showReward(false)}>Collect</button>
        </div>
      </div>
    </>
  );
};

export default Reward;
