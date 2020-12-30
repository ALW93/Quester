import React, { useState } from "react";
import { useSelector } from "react-redux";
import mail from "../assets/letter_icon.svg";
import MessageForm from "./MessageForm";
import SearchForm from "./SearchForm";
import "./Social.css";

const Friends = () => {
  const friendlist = useSelector((state) => state.user.friends);
  const [open, setOpen] = useState(false);
  const [search, openSearch] = useState(true);
  const [recipient, setRecipient] = useState("");
  const [id, setId] = useState("");
  const [heal, setHeal] = useState(false);

  const handleClickOpen = (id, name, heal) => {
    setOpen(true);
    setId(id);
    setRecipient(name);
    setHeal(heal);
  };

  const openFriendSearch = () => {
    openSearch(true);
  };

  return (
    <>
      <div className="social__container--friends">
        <div>
          <h1 className="white">Friends</h1>
        </div>

        <MessageForm
          open={open}
          setOpen={setOpen}
          recipient={recipient}
          id={id}
          heal={heal}
        />
        {search ? <SearchForm /> : null}
        <div>
          {friendlist.length ? (
            friendlist.map((e) => {
              let heal = false;
              if (e.health < 100) heal = true;
              return (
                <>
                  <div className="friend">
                    <h1 className="friendname">
                      {e.username}{" "}
                      <img
                        src={mail}
                        style={{ width: "50px" }}
                        onClick={() => handleClickOpen(e.id, e.username, heal)}
                      />
                    </h1>

                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${e.health}%` }}
                    >
                      {e.health}/100 HP
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div>
              <h2 className="white">No Friends Yet!</h2>
            </div>
          )}
        </div>
        <button class="cute learn-more" onClick={openFriendSearch}>
          Find User
        </button>
      </div>
    </>
  );
};

export default Friends;
