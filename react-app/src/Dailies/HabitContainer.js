import React, { useEffect, useState } from "react";
import { Info, DateTime } from "luxon";
import { useDispatch } from "react-redux";
import Check from "./Check.js";
import {
  getHabitCategory,
  getHabitChecks,
} from "../store/actions/habitReducer";
import Category from "../Shared/Category";
import { removeHabit } from "../store/actions/habitReducer";
import "./Habit.css";
import { setUpdate } from "../store/actions/utilityReducer";

const HabitContainer = ({ data }) => {
  const [checks, setChecks] = useState([]);
  const [parsed, setParsed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const checkQuery = await dispatch(getHabitChecks(data.id));
      const cats = await dispatch(getHabitCategory(data.id));
      await setChecks(checkQuery);
      await setCategories(cats);
      setLoaded(true);
    })();
  }, [data]);

  useEffect(() => {
    if (checks.length) {
      const parsed = checks.map((c) => {
        return DateTime.fromHTTP(`${c.date}`, { zone: "utc" }).toLocaleString({
          weekday: "long",
          month: "2-digit",
          day: "2-digit",
        });
      });
      setParsed(parsed);
    }
  }, [checks, setChecks]);

  const deleteHandler = async () => {
    await dispatch(removeHabit(data.id));
    await dispatch(
      setUpdate({
        type: "Success",
        message: "Successfully Deleted Habit!",
      })
    );
  };

  if (!loaded) {
    return null;
  }

  return (
    <div className="habit__container">
      <div className="habit__detail">
        <div style={{ display: "flex", alignSelf: "center" }}>
          <h1>{data.name}</h1>
          {categories &&
            categories.map((c, i) => {
              return <Category data={c} key={`habitCategory${i}`} />;
            })}
        </div>
        <button className="red cute" onClick={deleteHandler}>
          DELETE
        </button>
      </div>

      <div className="habit__calendar" style={{ display: "flex" }}>
        {Info.weekdays().map((day, i) => {
          const value = DateTime.local().startOf("week").plus({ days: i });

          const display = DateTime.local()
            .startOf("week")
            .plus({ days: i })
            .toLocaleString({
              weekday: "long",
            });

          return (
            <>
              <Check
                data={data}
                display={display.toUpperCase()}
                parsed={parsed}
                value={value}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HabitContainer;
