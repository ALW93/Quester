import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import mail from "./letter_icon.svg";
import potion from "./potion_icon.svg";

export const deleteIcon = () => <DeleteOutlineIcon />;
export const editIcon = () => <EditIcon />;
export const mailIcon = () => <img src={mail} />;
export const potionIcon = () => <img src={potion} style={{ width: "47px" }} />;
