import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const startTime = () => {
      setTimeout(
        () =>
          setTime(
            new Date().toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          ),
        1000
      );
    };
    startTime();
  });

  return (
    <>
      <div>
        {new Date().toLocaleDateString([], {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <div>{time}</div>
      </div>
    </>
  );
};

export default Clock;
