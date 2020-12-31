import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailIcon, potionIcon, requestIcon } from "../assets/icons";
import { Paper } from "@material-ui/core";
import { DateTime } from "luxon";
import {
  mailOpener,
  acceptFriend,
  mailDeleter,
} from "../store/actions/userReducer";

const Inbox = () => {
  const mail = useSelector((state) => state.user.messages);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleOpen = async (id) => {
    await dispatch(mailOpener(id));
  };

  const handleAccept = async (msgId, friendId) => {
    await dispatch(acceptFriend(user.id, { friend_id: friendId }));
    await dispatch(mailDeleter(msgId, user.id));
  };

  const handleReject = async (msgId, friendId) => {
    await dispatch(mailDeleter(msgId, user.id));
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
                  <div className="letter">
                    {e.status !== "read" ? (
                      <div>
                        {e.type === "potion" ? (
                          <>
                            {potionIcon()}{" "}
                            <h5>
                              {e.sender.username} healed you with a {e.type}!
                            </h5>
                            <button onClick={() => handleOpen(e.id)}>
                              Click to Read Message
                            </button>
                          </>
                        ) : null}
                        {e.type === "mail" ? (
                          <>
                            {mailIcon()}{" "}
                            <h5>
                              {e.sender.username} healed you with a {e.type}!
                            </h5>
                            <button onClick={() => handleOpen(e.id)}>
                              Click to Read Message
                            </button>
                          </>
                        ) : null}
                        {e.type === "request" ? (
                          <>
                            {requestIcon()}{" "}
                            <h5>
                              {e.sender.username} sent you a friend request!
                            </h5>
                            <button
                              onClick={() => handleAccept(e.id, e.sender.id)}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(e.id, e.sender.id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : null}
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
            <h2 className="white">You have no mail.</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Inbox;
