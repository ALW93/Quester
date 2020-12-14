import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import HabitContainer from "./HabitContainer";
import { DateTime } from "luxon";
import HabitForm from "./HabitForm";

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
      <h1 className="white">Daily Quests</h1>
      <div>
        <div style={{ color: "white" }}>
          {DateTime.local().startOf("week").toLocaleString(DateTime.DATE_FULL)}
          {" - "}
          {DateTime.local().endOf("week").toLocaleString(DateTime.DATE_FULL)}
        </div>
        {habitForm ? (
          <HabitForm setHabitForm={setHabitForm} setHabits={setHabits} />
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              showHabitForm(true);
            }}
          >
            Add Daily
          </Button>
        )}

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
