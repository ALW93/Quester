import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import HabitContainer from "./HabitContainer";
import DateTime from "luxon/src/datetime.js";
import HabitForm from "./HabitForm";
import CategoryForm from "../Shared/CategoryForm";

const Habit = () => {
  const data = useSelector((state) => state.habits.habits);
  const [habits, setHabits] = useState([]);

  const [habitForm, setHabitForm] = useState(false);

  useEffect(() => {
    setHabits(data);
  }, [data]);

  const showHabitForm = (open) => {
    setHabitForm(open);
  };

  return (
    <>
      <h1>Habits</h1>
      <div>
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              showHabitForm(true);
            }}
          >
            Add Daily
          </Button>
        </div>
        <div>
          {DateTime.local().startOf("week").toLocaleString(DateTime.DATE_FULL)}
          {" - "}
          {DateTime.local().endOf("week").toLocaleString(DateTime.DATE_FULL)}
        </div>
        {habitForm ? (
          <HabitForm setHabitForm={setHabitForm} setHabits={setHabits} />
        ) : null}

        <div>
          {habits &&
            habits.map((habit, i) => {
              return <HabitContainer data={habit} key={`Habit${i}`} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Habit;
