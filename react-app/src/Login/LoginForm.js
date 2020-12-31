import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setId, setUser, login } from "../store/actions/authReducer";
import { showForm } from "../store/actions/utilityReducer";
import { TextField } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
import "./LoginForm.css";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { setAvatar, getAvatar } from "../store/actions/avatarReducer";
import { setUserInfo } from "../store/actions/authReducer";
import {
  getTasks,
  getComplete,
  getExpired,
} from "../store/actions/tasksReducer";
import { getCategories } from "../store/actions/categoryReducer";
import { getHabits } from "../store/actions/habitReducer";
import { getStats } from "../store/actions/statReducer";
import { getUserFriends, getUserMessages } from "../store/actions/userReducer";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.session.auth);
  const form = useSelector((state) => state.utility.visible);

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    const avatar = await getAvatar(user.id);

    if (!user.errors) {
      dispatch(setAuth(true));
      dispatch(setId(user.id));
      dispatch(setUser(user));
      dispatch(setAvatar(avatar));
      dispatch([
        setUserInfo(),
        getAvatar(user.id),
        getTasks(user.id),
        getExpired(user.id),
        getComplete(user.id),
        getCategories(user.id),
        getHabits(user.id),
        getStats(user.id),
        getUserFriends(user.id),
        getUserMessages(user.id),
      ]);
    } else {
      setErrors(user.errors);
    }
  };

  const showSignup = (open) => {
    dispatch(showForm(open));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const setCreds = (e) => {
    e.preventDefault();
    setEmail("admin@aa.io");
    setPassword("password");
  };

  if (authorized) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login__container">
      <div className="login__left" />

      <div className="login__center">
        <h1 style={{ fontSize: "100px", color: "rgb(12,17,33)" }}>Quester</h1>
        <div className="form__container">
          {!form ? (
            <SignUpForm showSignup={showSignup} />
          ) : (
            <>
              <form onSubmit={onLogin}>
                <div>
                  {errors.map((error) => (
                    <div>{error}</div>
                  ))}
                </div>
                <div style={{ margin: "30px 0 30px 0" }}>
                  <div>
                    <h1>Email</h1>
                    <TextField
                      variant="outlined"
                      type="text"
                      fullWidth={true}
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      value={email}
                      onChange={updateEmail}
                    />
                  </div>
                  <div>
                    <h1>Password</h1>
                    <TextField
                      type="password"
                      fullWidth={true}
                      variant="outlined"
                      label="Password"
                      InputLabelProps={{ shrink: true }}
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" className="fadebutton">
                    LOGIN
                  </button>
                  {"  "}
                  <button className="fadebutton" onClick={setCreds}>
                    DEMO
                  </button>
                </div>
              </form>
              <h2
                onClick={() => showSignup(true)}
                style={{ marginTop: "20px" }}
              >
                Sign up Here <DoubleArrowIcon />
              </h2>
            </>
          )}
        </div>
      </div>

      <div className="login__left flip__x" />
    </div>
  );
};

export default LoginForm;
