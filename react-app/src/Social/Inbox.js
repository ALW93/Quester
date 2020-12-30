import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailIcon, potionIcon } from "../assets/icons";
import { Paper } from "@material-ui/core";
import { DateTime } from "luxon";
import { mailOpener } from "../store/actions/userReducer";

const Inbox = () => {
  const mail = useSelector((state) => state.user.messages);
  const dispatch = useDispatch();

  const handleOpen = async (id) => {
    await dispatch(mailOpener(id));
  };

  return (
    <>
      <div className="social__container--inbox">
        <div>
          <h1 className="white">Inbox</h1>
        </div>
        <div>
          {mail.length ? (
            mail.map((e) => {
              return (
                <>
                  <div elevation={3} className="letter">
                    {e.status !== "read" ? (
                      <div>
                        {e.type === "potion" ? potionIcon() : mailIcon()}
                        <div>
                          <h5>
                            {e.sender.username} sent you a {e.type}!
                          </h5>
                          <button onClick={() => handleOpen(e.id)}>
                            Click to Open
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div>
                            {e.type === "potion" ? potionIcon() : mailIcon()}
                          </div>
                          <div>from {e.sender.username}</div>
                        </div>

                        <Paper
                          elevation={3}
                          style={{
                            width: "100%",
                            padding: "12px",
                            margin: "5px",
                          }}
                        >
                          "{e.message}"
                        </Paper>
                        <div>
                          Opened{" "}
                          {DateTime.fromHTTP(e.received).toLocaleString()}
                        </div>
                      </>
                    )}
                  </div>
                </>
              );
            })
          ) : (
            <h2 className="white" style={{ marginTop: "50%" }}>
              You have no mail.
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Inbox;
