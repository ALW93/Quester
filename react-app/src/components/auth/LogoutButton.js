import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/actions/auth"

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(setAuth(false))
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
