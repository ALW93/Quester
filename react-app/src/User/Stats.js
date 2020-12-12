import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { parseStatLevel } from "../services/levels";

const Stats = () => {
  const stats = useSelector((state) => state.stats.stats);
  const update = useSelector((state) => state.utility.update);

  useEffect(() => {
    if (update) {
      console.log("stats updating");
    }
  }, [update]);

  return (
    <>
      <h1>Stats</h1>
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
