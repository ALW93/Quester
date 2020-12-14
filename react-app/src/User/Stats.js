import React from "react";
import { useSelector } from "react-redux";
import "./User.css";
import { parseStatLevel } from "../services/levels";
import { hatIcon, swordIcon, bookIcon } from "../assets/icons";

const Stats = () => {
  const stats = useSelector((state) => state.stats.stats);

  return (
    <>
      {stats &&
        stats.map((stat, i) => {
          return (
            <>
              <div key={`${i}${stat.name}`}>
                {stat.name === "Strength" ? (
                  <>
                    {swordIcon()} {stat.name}
                  </>
                ) : null}
                {stat.name === "Magic" ? (
                  <>
                    {hatIcon()} {stat.name}
                  </>
                ) : null}
                {stat.name === "Intelligence" ? (
                  <>
                    {bookIcon()} {stat.name}
                  </>
                ) : null}{" "}
                || {stat.points} points {parseStatLevel(stat.points)}
              </div>
            </>
          );
        })}
    </>
  );
};

export default Stats;
