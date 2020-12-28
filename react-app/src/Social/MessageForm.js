import React from "react";
import { InputAdornment, TextField, Button, Checkbox } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const MessageForm = ({ open, setOpen, id, recipient, heal }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const verifyMessage = () => {
    console.log("spend");
  };

  return (
    <>
      {open ? (
        <div open={open} onClose={handleClose} className="message_form">
          {heal ? (
            <div>
              <div>{recipient} is hurt! Send a potion?</div>
              <Checkbox checkedIcon={<Favorite />} icon={<FavoriteBorder />}>
                Test
              </Checkbox>
            </div>
          ) : null}
          <TextField
            autoFocus
            id="name"
            label={`Message to ${recipient}`}
            multiline
            fullWidth
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
