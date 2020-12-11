import React from "react";
import { useSelector } from "react-redux";
import { mailIcon, potionIcon } from "../assets/icons";
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
                  <Paper
                    elevation={3}
                    style={{ padding: "10px", margin: "3px" }}
                  >
                    <div>
                      {e.type === "potion" ? potionIcon() : mailIcon()}
                      from {e.sender.username}
                    </div>
                    <p>"{e.message}"</p>
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
