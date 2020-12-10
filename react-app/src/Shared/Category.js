import React, { useEffect, useState } from "react";
import { Paper, Button } from "@material-ui/core";
import "./Category.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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
    <>
      <Paper
        variant="outlined"
        square
        style={{
          padding: "5px",
          backgroundColor: "beige",
          width: "fit-content",
        }}
      >
        <div>
          <b>{data.name}</b>
        </div>
        <div className="stat__container">
          <div>{stat.name}</div>
          <div className="test">
            <KeyboardArrowUpIcon />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Category;
