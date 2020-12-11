import React from "react";
import { useSelector } from "react-redux";

const Friends = () => {
  const friendlist = useSelector((state) => state.user.friends);
  return (
    <>
      <div>
        <div>
          <h1>Friends</h1>
        </div>
        <div>
          {friendlist &&
            friendlist.map((e) => {
              return (
                <>
                  <h1>{e.username}</h1>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${e.health}%` }}
                  >
                    {e.health}/100 HP
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
