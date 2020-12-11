import React, { useEffect, useState } from "react";
import Info from "luxon/src/info.js";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import {
  getHabitCategory,
  getHabitChecks,
  postCheck,
  removeCheck,
} from "../store/actions/habitReducer";
import DateTime from "luxon/src/datetime.js";
import Category from "../Shared/Category";
import { removeHabit } from "../store/actions/habitReducer";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "./Habit.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const HabitContainer = ({ data }) => {
  const user = useSelector((state) => state.session.user);
  const [checks, setChecks] = useState([]);
  const [parsed, setParsed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [remove, setRemove] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      console.log("firing off");
      const checkQuery = await dispatch(getHabitChecks(data.id));
      await setChecks(checkQuery);
      setLoaded(true);
      console.log(parsed);
    })();
  }, [data, remove]);

  useEffect(() => {
    (async () => {
      const cats = await dispatch(getHabitCategory(data.id));
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
  }, [checks, setChecks, remove]);

  const deleteHandler = async () => {
    await dispatch(removeHabit(data.id));
  };

  const checkHandler = async (value) => {
    console.log("checked!");
    const new_check = {
      date: value,
      user_id: user.id,
      habit_id: data.id,
    };
    await dispatch(postCheck(data.id, new_check));
    const checkQuery = await dispatch(getHabitChecks(data.id));
    await setChecks(checkQuery);
  };

  const checkRemover = async (display) => {
    setLoaded(false);
    const short = display.slice(0, 3);
    const id = checks.filter((e) => e.date.includes(short))[0].id;
    await dispatch(removeCheck(data.id, id));
    await setRemove(id);
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <div style={{ display: "flex " }}>
        <h1>{data.name}</h1>
        {categories &&
          categories.map((c, i) => {
            return <Category data={c} key={`habitCategory${i}`} />;
          })}
        <Button color="secondary" variant="contained" onClick={deleteHandler}>
          Delete
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        {Info.weekdays().map((day, i) => {
          const currentDay = DateTime.local()
            .startOf("week")
            .plus({ days: i })
            .toLocaleString({
              weekday: "long",
              month: "2-digit",
              day: "2-digit",
            });
          const value = DateTime.local()
            .startOf("week")
            .plus({ days: i })
            .toHTTP({ zone: "est" });
          const display = DateTime.local()
            .startOf("week")
            .plus({ days: i })
            .toLocaleString({
              weekday: "long",
            });
          return (
            <>
              <div key={`Check${i}${day}`}>
                <div>{display}</div>
                <div>
                  {parsed.includes(currentDay) ? (
                    <CheckBoxIcon
                      style={{ fill: "green" }}
                      onClick={() => checkRemover(display)}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      onClick={() => checkHandler(value)}
                    />
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default HabitContainer;
