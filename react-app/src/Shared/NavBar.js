import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

const NavBar = () => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/users/${userId}`}
            exact={true}
            activeClassName="active"
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
