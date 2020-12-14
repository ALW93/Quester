import React from "react";
import { Button } from "@material-ui/core";
import Friends from "./Friends";
import Inbox from "./Inbox";
import "./Social.css";

const Social = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Friends />
        <Inbox />
      </div>
    </div>
  );
};

export default Social;
