import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";
import { Button } from "@material-ui/core";
import { deleteIcon, editIcon } from "../assets/icons";
import { MiniForm } from "./MiniForm";

const CategoryForm = () => {
  const cats = useSelector((state) => state.categories.categories);
  const [categories, setCategories] = useState([]);
  const [emptySlot, setEmptySlot] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await setCategories(cats);
      const length = 10 - cats.length;
      await setEmptySlot(length);
      setLoaded(true);
    })();
  }, [cats]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <div className="category__grid">
        {categories &&
          categories.map((c, i) => {
            return (
              <>
                <div className="category__content">
                  <Category data={c} key={`Category${i}`} />
                  {deleteIcon()}
                  {editIcon()}
                </div>
              </>
            );
          })}
        {emptySlot &&
          Array.from(Array(emptySlot)).map((i, idx) => {
            return (
              <>
                <div className="category__content">
                  <MiniForm num={cats.length + idx + 1} />
                </div>
              </>
            );
          })}
      </div>
      <div>
        <Button variant="outlined">Cancel</Button>
      </div>
    </>
  );
};

export default CategoryForm;
