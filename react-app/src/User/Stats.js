import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./User.css";
import { parseStatLevel } from "../services/levels";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const Stats = () => {
  const stats = useSelector((state) => state.stats.stats);
  const update = useSelector((state) => state.utility.update);
  const [showUpdate, hideShowUpdate] = useState(false);

  useEffect(() => {
    const statChange = () => {
      setTimeout(() => hideShowUpdate(false), 10000);
    };

    if (update) {
      console.log("stats updating");
      hideShowUpdate(true);
      statChange();
    }
  }, [update]);

  return (
    <>
      <h1>Stats</h1>
      {showUpdate ? (
        <>
          <div className="test">
            Level up !
            <KeyboardArrowUpIcon />
          </div>
        </>
      ) : null}
      {stats &&
        stats.map((stat, i) => {
          return (
            <>
              <div key={`${i}${stat.name}`}>
                <li>{stat.name}</li>
                Points: {stat.points} {parseStatLevel(stat.points)}
              </div>
            </>
          );
        })}
    </>
  );
};

export default Stats;
