import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import mail from "./letter_icon.svg";

export const deleteIcon = () => <DeleteOutlineIcon />;
export const editIcon = () => <EditIcon />;
export const mailIcon = () => <img src={mail} />;
