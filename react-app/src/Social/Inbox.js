import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailIcon, potionIcon, requestIcon } from "../assets/icons";
import { Paper } from "@material-ui/core";
import { DateTime } from "luxon";
import {
  mailOpener,
  acceptFriend,
  mailDeleter,
} from "../store/actions/userReducer";
import FiberNewIcon from "@material-ui/icons/FiberNew";

const Inbox = () => {
  const mail = useSelector((state) => state.user.messages);
  const user = useSelector((state) => state.session.user);
  const [inbox, setInbox] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setInbox(mail);
  }, [mail]);

  const handleOpen = async (id) => {
    await dispatch(mailOpener(id));
  };

  const handleAccept = async (msgId, friendId) => {
    await dispatch(acceptFriend(user.id, { friend_id: friendId }));
    await dispatch(mailDeleter(msgId, user.id));
  };

  const handleReject = async (msgId) => {
    await dispatch(mailDeleter(msgId));
  };

  const toggleView = (filter) => {
    let letters = mail;
    if (filter === "new") {
      return setInbox(letters.filter((e) => e.status === "unread"));
    }
    if (filter === "request") {
      return setInbox(letters.filter((e) => e.type === "request"));
    }
    if (filter === "read") {
      return setInbox(letters.filter((e) => e.status === "read"));
    }
    console.log(letters);
  };

  return (
    <>
      <div className="social__container--inbox">
        <div>
          <h1 className="white">Inbox</h1>
        </div>
        <button class="blue cute" onClick={() => toggleView("new")}>
          NEW
        </button>
        <button class="yellow cute" onClick={() => toggleView("request")}>
          FRIEND REQUESTS
        </button>
        <button class="pink cute" onClick={() => toggleView("read")}>
          READ
        </button>
        <div>
          {inbox.length &&
            inbox.map((e) => {
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
            })}
        </div>
      </div>
    </>
  );
};

export default Inbox;
