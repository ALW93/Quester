import React from "react";
import "./Reward.css";
import { Snackbar } from "@material-ui/core";
import heartIcon from "../assets/broken-heart.svg";

const Damage = ({ message, showDamage }) => {
  return (
    <Snackbar
      open={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <div className="reward__notice">
        <div className="reward__inner">
          <h1>Oops!</h1>
          <img src={heartIcon} style={{ width: "70px" }} />
          <div className="reward__detail">
            <div>{message}</div>
          </div>
          <button onClick={() => showDamage(false)}>Dismiss</button>
        </div>
      </div>
    </Snackbar>
  );
};

export default Damage;
