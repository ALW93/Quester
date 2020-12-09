import React, { useEffect, useState } from "react";
import Info from "luxon/src/info.js";
import { useDispatch } from "react-redux";
import { getHabitChecks } from "../store/actions/habitReducer";

const HabitContainer = ({ data }) => {
  const [checks, setChecks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const checks = await dispatch(getHabitChecks(data.id));
      await setChecks(checks);
    })();
  }, [data]);

  return (
    <>
      <h1>{data.name}</h1>
      {data.id}
      {JSON.stringify(checks)}
      <div>
        {Info.weekdays().map((day) => {
          return (
            <>
              <div>
                <div>{day}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default HabitContainer;
