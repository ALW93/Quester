import React from "react";
import { useSelector } from "react-redux";
import { parseStatLevel } from "../services/levels";

const Stats = () => {
  const stats = useSelector((state) => state.stats.stats);

  return (
    <>
      <h1>Stats</h1>
      {stats &&
        stats.map((stat) => {
          return (
            <>
              <div>
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
