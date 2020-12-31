import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Habit.css";
import { setUpdate } from "../store/actions/utilityReducer";
import { DateTime } from "luxon";
import { postCheck, removeCheck } from "../store/actions/habitReducer";
import { ribbon, noribbon, calIcon } from "../assets/icons";

const Check = ({ data, display, parsed, value }) => {
  const user = useSelector((state) => state.session.user);
  const [check, showCheck] = useState(false);
  const dispatch = useDispatch();
  const today = DateTime.local()
    .toLocaleString({ weekday: "long" })
    .toUpperCase();

  useEffect(() => {
    if (
      parsed.includes(
        value.toLocaleString({
          weekday: "long",
          month: "2-digit",
          day: "2-digit",
        })
      )
    ) {
      showCheck(true);
    }
  }, [data, value, parsed]);

  const checkHandler = async (value) => {
    if (today !== display) {
      return dispatch(
        setUpdate({
          type: "Warning",
          message: `Checks only open for ${today}`,
        })
      );
    }
    const new_check = {
      date: value,
      user_id: user.id,
      habit_id: data.id,
    };
    await dispatch(postCheck(data.id, new_check));
    showCheck(true);
  };

  const checkRemover = async (display) => {
    if (today !== display) {
      return alert("Wrong day!");
    }
    await dispatch(removeCheck(data.id, { date: value }));
    showCheck(false);
  };

  return (
    <div className="calendar__day">
      {today === display ? (
        <>
          <div
            style={{
              position: "absolute",
              marginTop: "-32px",
              marginLeft: "23px",
            }}
          >
            {calIcon()}
          </div>
          <div>{display}</div>
        </>
      ) : (
        <div>{display}</div>
      )}

      <div>
        {check ? (
          <div onClick={() => checkRemover(display)}> {ribbon()}</div>
        ) : (
          <div onClick={() => checkHandler(value)}>{noribbon()}</div>
        )}
      </div>
    </div>
  );
};
export default Check;
