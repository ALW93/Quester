import React, { useEffect, useState } from "react";
import Info from "luxon/src/info.js";
import { useDispatch } from "react-redux";
import { getHabitChecks } from "../store/actions/habitReducer";
import DateTime from "luxon/src/datetime.js";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const HabitContainer = ({ data }) => {
  const [checks, setChecks] = useState([]);
  const [parsed, setParsed] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const checkQuery = await dispatch(getHabitChecks(data.id));
      await setChecks(checkQuery);
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
      {JSON.stringify(parsed)}
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
                ) : null}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default HabitContainer;
