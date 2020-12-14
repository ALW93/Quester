import React, { useEffect, useState } from "react";
import { Paper, Button } from "@material-ui/core";
import "./Category.css";
import arrow from "../assets/arrow.svg";

const Category = ({ data }) => {
  const [stat, setStat] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getStat = async () => {
      const response = await fetch(`/api/data/stat/${data.stat_id}`);
      const info = await response.json();
      setStat(info);
    };
    getStat();
    setLoaded(true);
  }, [data]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="cat__container">
      <div
        variant="outlined"
        className="cat"
        style={{
          textAlign: "center",
          backgroundColor: "rgb(66,110,113)",
          color: "white",
          border: "3px double white",
        }}
      >
        <div>{data.name}</div>
      </div>
      <div className="cat" style={{ backgroundColor: "white" }}>
        <div className="test">
          <img
            src={arrow}
            style={{
              width: "10px",
              marginRight: "4px",
            }}
          />
        </div>
        <div style={{ display: "flex", fontSize: "15px" }}>
          <div>{stat.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
