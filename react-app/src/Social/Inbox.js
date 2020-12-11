import React from "react";
import { useSelector } from "react-redux";
import { mailIcon } from "../assets/icons";
import { Paper } from "@material-ui/core";

const Inbox = () => {
  const mail = useSelector((state) => state.user.messages);
  return (
    <>
      <div className="social__container--inbox">
        <div>
          <h1>Inbox</h1>
        </div>
        <div>
          {mail &&
            mail.map((e) => {
              return (
                <>
                  <Paper>
                    <div>
                      {mailIcon()}
                      {e.type.toUpperCase()} from {e.sender.username}
                    </div>
                    <div>Received {e.received}</div>
                  </Paper>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Inbox;
