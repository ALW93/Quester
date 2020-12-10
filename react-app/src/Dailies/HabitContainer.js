import React, { useEffect, useState } from "react";
import Info from "luxon/src/info.js";
import { useDispatch } from "react-redux";
import {
  getHabitCategory,
  getHabitChecks,
} from "../store/actions/habitReducer";
import DateTime from "luxon/src/datetime.js";
import Category from "../Shared/Category";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const HabitContainer = ({ data }) => {
  const [checks, setChecks] = useState([]);
  const [parsed, setParsed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const checkQuery = await dispatch(getHabitChecks(data.id));
      await setChecks(checkQuery);
    })();
  }, [data]);

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
        console.log(c.date);
        return DateTime.fromHTTP(`${c.date}`, { zone: "utc" }).toLocaleString({
          weekday: "long",
          month: "2-digit",
          day: "2-digit",
        });
      });
      setParsed(parsed);
    }
  }, [checks]);

  return (
    <>
      <h1>{data.name}</h1>
      <div>
        {Info.weekdays().map((day, i) => {
          const currentDay = DateTime.local()
            .startOf("week")
            .plus({ days: i })
            .toLocaleString({
              weekday: "long",
              month: "2-digit",
              day: "2-digit",
            });
          return (
            <>
              <div key={`Check${i}${day}`}>
                {currentDay}
                {parsed.includes(currentDay) ? (
                  <CheckBoxIcon style={{ fill: "green" }} />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </div>
            </>
          );
        })}
      </div>
      {categories &&
        categories.map((c, i) => {
          return <Category data={c} key={`habitCategory${i}`} />;
        })}
    </>
  );
};

export default HabitContainer;
