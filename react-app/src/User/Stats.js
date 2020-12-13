import React from "react";
import { useSelector } from "react-redux";
import "./User.css";
import { parseStatLevel } from "../services/levels";

const Stats = () => {
  const stats = useSelector((state) => state.stats.stats);

  return (
    <>
      <h1></h1>

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
