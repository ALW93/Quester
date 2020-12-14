import React from "react";
import { useSelector } from "react-redux";
import { mailIcon, potionIcon } from "../assets/icons";
import "./Social.css";

const Friends = () => {
  const friendlist = useSelector((state) => state.user.friends);
  return (
    <>
      <div className="social__container--friends">
        <div>
          <h1 className="white">Friends</h1>
        </div>
        <div>
          {friendlist &&
            friendlist.map((e) => {
              return (
                <>
                  <div className="friend">
                    <h1 className="friendname">
                      {e.username}
                      {mailIcon()}
                    </h1>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${e.health}%` }}
                    >
                      {e.health}/100 HP
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Friends;
