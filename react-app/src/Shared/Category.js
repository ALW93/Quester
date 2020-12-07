import React, { useEffect, useState } from "react";

const Category = ({ data }) => {
  const [stat, setStat] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/tasks/${t.id}/cat`);
      const data = await response.json();
      setStat(data.categories);
    })();
  }, []);
  return (
    <>
      {JSON.stringify(data)}
      <h5>{data.name}</h5>
    </>
  );
};

export default Category;
