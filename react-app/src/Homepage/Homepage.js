import React from "react";
import "./Homepage.css";
import Avatar from "../Avatar/Avatar";

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
          <Avatar />
        </div>
        <div className="homepage__bottom-right"></div>
      </div>
    </>
  );
};

export default Homepage;
