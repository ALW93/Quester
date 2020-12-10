import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";
import { Button, TextField, Select, MenuItem } from "@material-ui/core";
import { deleteIcon, editIcon } from "../assets/icons";
import { addTask } from "../store/actions/tasksReducer";

const CategoryForm = () => {
  const cats = useSelector((state) => state.categories.categories);
  const [categories, setCategories] = useState([]);
  const [emptySlot, setEmptySlot] = useState(0);
  const [mini, setMini] = useState(false);

  useEffect(() => {
    (async () => {
      await setCategories(cats);
      const length = 10 - cats.length;
      await setEmptySlot(length);
    })();
  }, [cats]);

  const submitHandler = () => {
    console.log("submitting!");
  };

  const miniForm = () => {
    return (
      <form>
        <TextField placeholder="Category Name" />
        <Select>
          <MenuItem>Something</MenuItem>
        </Select>
        <div>
          <Button onClick={submitHandler}>Submit</Button>
          <Button onClick={() => setMini(false)}>Cancel</Button>
        </div>
      </form>
    );
  };

  const addTaskButton = () => {
    return (
      <>
        <Button onClick={() => setMini(true)}>Add a Category</Button>
      </>
    );
  };

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
          Array.from(Array(emptySlot)).map((e) => {
            return <>{mini ? miniForm() : addTaskButton()}</>;
          })}
      </div>
      <div>
        <Button type="submit" variant="outlined">
          Submit
        </Button>
        <Button variant="outlined">Cancel</Button>
      </div>
    </>
  );
};

export default CategoryForm;
