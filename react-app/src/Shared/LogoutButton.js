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
        <button className="fadebutton" onClick={onLogout}>
          <div className="logoutButton__inner">
            Logout
            <ExitToAppIcon />
          </div>
        </button>
      </div>
    </>
  );
};

export default LogoutButton;
