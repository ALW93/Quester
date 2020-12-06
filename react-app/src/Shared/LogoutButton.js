import React from "react";
import { logout } from "../services/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/actions/auth";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await logout();
    dispatch(setAuth(false));
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
