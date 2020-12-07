import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

const Category = ({ data }) => {
  const [stat, setStat] = useState("");

  useEffect(() => {
    const getStat = async () => {
      const response = await fetch(`/api/data/stat/${data.stat_id}`);
      const info = await response.json();
      console.log(info);
      setStat(info);
    };
    getStat();
  }, []);
  return (
    <>
      <Button variant="contained">{data.name}</Button>
      <h6>{stat.name} +</h6>
    </>
  );
};

export default Category;
