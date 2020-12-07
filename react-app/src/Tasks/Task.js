import React, { useEffect, useState } from "react";

const Task = ({ t }) => {
  const [ids, setIds] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/tasks/${t.id}/cat`);
      const data = await response.json();
      setIds(data);
    })();
  }, []);

  useEffect(() => {}, [categories]);
  return (
    <>
      <li>{JSON.stringify(categories)}</li>
      <li>{t.name}</li>
      <li>difficulty: {t.difficulty}</li>
      <li>frequency: {t.frequency}</li>
      <li>status: {t.status}</li>
    </>
  );
};

export default Task;
