import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";

const CategoryForm = () => {
  const id = useSelector((state) => state.auth.userId);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${id}/categories`);
      const data = await response.json();
      console.log(data);
      setCategories(data.cats);
    })();
  }, []);

  return (
    <>
      <h1>Categories</h1>
      {categories &&
        categories.map((c) => {
          return (
            <li>
              <Category data={c} />
            </li>
          );
        })}
    </>
  );
};

export default CategoryForm;
