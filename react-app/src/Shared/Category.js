import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const Category = ({ data }) => {
  const [stat, setStat] = useState("");

  useEffect(() => {
    const getStat = async () => {
      const response = await fetch(`/api/data/stat/${data.stat_id}`);
      const info = await response.json();
      setStat(info);
    };
    getStat();
  }, []);

  return (
    <>
      <Button variant="outlined">{data.name}</Button>
      {stat.name} <KeyboardArrowUpIcon />
    </>
  );
};

export default Category;
