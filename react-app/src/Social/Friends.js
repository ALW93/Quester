import React from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

const Friends = () => {
  const friendlist = useSelector((state) => state.user.friends);
  return (
    <>
      <div className="social__container--friends">
        <div>
          <h1>Friends</h1>
        </div>
        <div>
          {friendlist &&
            friendlist.map((e) => {
              return (
                <>
                  <Paper>
                    <h1>{e.username}</h1>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${e.health}%` }}
                    >
                      {e.health}/100 HP
                    </div>
                  </Paper>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Friends;
