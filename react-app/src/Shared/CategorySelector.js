import React from "react";
import { Checkbox } from "@material-ui/core";
import Category from "../Shared/Category";

const CategorySelector = ({ categories, updateCats }) => {
  return (
    <>
      {categories &&
        categories.map((c) => {
          return (
            <>
              <div>
                <Checkbox value={c.id} onChange={updateCats} />{" "}
                <Category data={c} />
              </div>
            </>
          );
        })}
    </>
  );
};

export default CategorySelector;
