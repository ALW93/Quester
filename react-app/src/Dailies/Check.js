import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "./Habit.css";
import {
  getHabitChecks,
  postCheck,
  removeCheck,
} from "../store/actions/habitReducer";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const Check = ({ data, display, parsed, value, checks, setChecks }) => {
  const user = useSelector((state) => state.session.user);
  const [check, showCheck] = useState(false);
  const dispatch = useDispatch();

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
    console.log("checked!");
    const new_check = {
      date: value,
      user_id: user.id,
      habit_id: data.id,
    };
    await dispatch(postCheck(data.id, new_check));
    showCheck(true);
  };

  const checkRemover = async (display) => {
    await dispatch(removeCheck(data.id, value));
    showCheck(false);
  };

  return (
    <div className="calendar__day">
      <div>{display}</div>
      <div>
        {check ? (
          <CheckBoxIcon
            style={{ fill: "green" }}
            onClick={() => checkRemover(display)}
          />
        ) : (
          <CheckBoxOutlineBlankIcon onClick={() => checkHandler(value)} />
        )}
      </div>
    </div>
  );
};
export default Check;
