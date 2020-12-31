import React from "react";
import { coinIcon, expIcon, healthIcon } from "../assets/icons";
import "./Reward.css";
import { Snackbar } from "@material-ui/core";

const Reward = ({ rewards, showReward }) => {
  return (
    <Snackbar
      open={rewards}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
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
    </Snackbar>
  );
};

export default Reward;
