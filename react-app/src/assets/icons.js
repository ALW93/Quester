import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import mail from "./letter_icon.svg";
import potion from "./potion_icon.svg";
import coin from "./coin2_icon.svg";
import avatar from "./transparent.png";
import star from "./star_ribbon.svg";

export const deleteIcon = () => <DeleteOutlineIcon />;
export const editIcon = () => <EditIcon />;
export const mailIcon = () => <img src={mail} />;
export const potionIcon = () => <img src={potion} style={{ width: "47px" }} />;
export const coinIcon = () => <img src={coin} style={{ width: "35px" }} />;
export const tempAvatar = () => <img src={avatar} style={{ width: "400px" }} />;
export const starIcon = (size) => (
  <img src={star} style={{ width: `${size}px` }} />
);
