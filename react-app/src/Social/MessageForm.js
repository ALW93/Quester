import React, { useState } from "react";
import { InputAdornment, TextField, Button, Checkbox } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import potionIcon from "../assets/potion_icon.svg";
import { useSelector } from "react-redux";

const MessageForm = ({ open, setOpen, id, recipient, heal }) => {
  const [potion, sendPotion] = useState(false);
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.session.user.id);

  const handleClose = () => {
    setOpen(false);
  };

  const togglePotion = () => {
    if (potion) return sendPotion(false);
    sendPotion(true);
  };

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const verifyMessage = async (e) => {
    e.preventDefault();
    let type = "mail";
    if (potion) type = "potion";
    const newMail = {
      type: type,
      message: message,
      receiver_id: id,
      sender_id: 1,
    };
    console.log(newMail);
    const response = await fetch(`api/users/${userId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMail),
    });
    if (response.ok) {
      setOpen(false);
    }
  };

  return (
    <>
      {open ? (
        <div open={open} onClose={handleClose} className="message_form">
          {heal ? (
            <div>
              <div>{recipient} is hurt! Send a potion?</div>
              <img src={potionIcon} style={{ width: "50px" }} />
              <div>
                <Checkbox
                  checkedIcon={<Favorite style={{ fill: "pink" }} />}
                  icon={<FavoriteBorder />}
                  onClick={togglePotion}
                />
                Cost: 100 gold
              </div>
            </div>
          ) : null}
          <TextField
            autoFocus
            id="name"
            label={`Message to ${recipient}`}
            multiline
            fullWidth
            onChange={updateMessage}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button onClick={verifyMessage} color="primary">
            Send
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </div>
      ) : null}
    </>
  );
};
export default MessageForm;
