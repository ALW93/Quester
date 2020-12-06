import React from "react";
import { logout } from "../services/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/actions/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await logout();
    dispatch(setAuth(false));
  };

  return (
    <>
      <div>
        <button onClick={onLogout}>Logout</button>
        <ExitToAppIcon />
      </div>
    </>
  );
};

export default LogoutButton;
