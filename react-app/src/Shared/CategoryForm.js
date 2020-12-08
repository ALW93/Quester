import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";

const CategoryForm = () => {
  const cats = useSelector((state) => state.categories.categories);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      setCategories(cats);
    })();
  }, [cats]);

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
