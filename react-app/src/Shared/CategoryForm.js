import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./Category";
import { Paper } from "@material-ui/core";
import { removeCategory } from "../store/actions/categoryReducer";
import { MiniForm } from "./MiniForm";
import "./Category.css";

const CategoryForm = () => {
  const cats = useSelector((state) => state.categories.categories);
  const user = useSelector((state) => state.session.user);
  const [categories, setCategories] = useState([]);
  const [emptySlot, setEmptySlot] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await setCategories(cats);
      const length = 9 - cats.length;
      await setEmptySlot(length);
      setLoaded(true);
    })();
  }, [cats]);

  const deleteCat = async (userId, catId) => {
    await dispatch(removeCategory(userId, catId));
  };

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
                  <button
                    className="fb2"
                    style={{ marginTop: "10px" }}
                    onClick={() => deleteCat(user.id, c.id)}
                  >
                    DELETE
                  </button>
                </div>
              </>
            );
          })}
        {emptySlot &&
          Array.from(Array(emptySlot)).map((i, idx) => {
            return (
              <>
                <Paper elevation={3} className="category__content">
                  <MiniForm num={cats.length + idx + 1} />
                </Paper>
              </>
            );
          })}
      </div>
    </>
  );
};

export default CategoryForm;
