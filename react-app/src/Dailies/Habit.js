import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import HabitContainer from "./HabitContainer";
import DateTime from "luxon/src/datetime.js";

const Habit = () => {
  const habits = useSelector((state) => state.habits.habits);

  return (
    <>
      <h1>Habits</h1>
      <div>
        <div>
          <Button variant="outlined">Add Daily</Button>
          <Button variant="outlined">Edit Categories</Button>
        </div>
        <div>
          {DateTime.local().startOf("week").toLocaleString(DateTime.DATE_FULL)}
          {" - "}
          {DateTime.local().endOf("week").toLocaleString(DateTime.DATE_FULL)}
        </div>
        <div>
          {habits &&
            habits.map((habit) => {
              return <HabitContainer data={habit} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Habit;
