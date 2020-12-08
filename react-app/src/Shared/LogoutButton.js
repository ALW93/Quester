import React from "react";
import { useDispatch } from "react-redux";
import { setAuth, logout } from "../store/actions/authReducer";
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
