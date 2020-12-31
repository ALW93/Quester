import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import CreateAvatar from "../User/CreateAvatar";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setId, setUser, signUp } from "../store/actions/authReducer";
import { createAvatar } from "../store/actions/avatarReducer";
import { TextField, Button } from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { setAvatar, getAvatar } from "../store/actions/avatarReducer";
import { setUserInfo, authenticate } from "../store/actions/authReducer";
import {
  getTasks,
  getComplete,
  getExpired,
} from "../store/actions/tasksReducer";
import { getCategories } from "../store/actions/categoryReducer";
import { getHabits } from "../store/actions/habitReducer";
import { getStats, createBase } from "../store/actions/statReducer";
import { getUserFriends, getUserMessages } from "../store/actions/userReducer";

const SignUpForm = ({ showSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.session.auth);
  const [prebuilt, setPrebuilt] = useState("");
  const [creation, showCreation] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        let data = { prebuilt: prebuilt };
        await createAvatar(user.id, data);
        await createBase(user.id);
        dispatch(setAuth(true));
        dispatch(setId(user.id));
        dispatch(setUser(user));
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
    } else {
      setErrors(["Passwords do not match!"]);
    }
  };

  const redirectCreation = (e) => {
    e.preventDefault();
    showCreation(true);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authorized) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {errors.map((error) => (
        <div>{error}</div>
      ))}
      {creation ? (
        <CreateAvatar
          prebuilt={prebuilt}
          setPrebuilt={setPrebuilt}
          onSignUp={onSignUp}
        />
      ) : (
        <>
          <h1>Create an Account</h1>
          <form>
            <div>
              <h2>Username</h2>
              <TextField
                type="text"
                variant="outlined"
                fullWidth={true}
                label="Username"
                InputLabelProps={{ shrink: true }}
                onChange={updateUsername}
                value={username}
              />
            </div>
            <div>
              <h2>Email</h2>
              <TextField
                type="text"
                variant="outlined"
                fullWidth={true}
                label="Email"
                InputLabelProps={{ shrink: true }}
                onChange={updateEmail}
                value={email}
              />
            </div>
            <div>
              <h2>Password</h2>
              <TextField
                type="password"
                variant="outlined"
                fullWidth={true}
                label="Password"
                InputLabelProps={{ shrink: true }}
                onChange={updatePassword}
                value={password}
              />
            </div>
            <div>
              <h2>Confirm Password</h2>
              <TextField
                type="password"
                variant="outlined"
                fullWidth={true}
                label="Confirm Password"
                InputLabelProps={{ shrink: true }}
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              />
            </div>
            <button
              className="fadebutton"
              onClick={redirectCreation}
              style={{ marginTop: "20px" }}
            >
              Continue
            </button>
          </form>
        </>
      )}
      <h2 onClick={() => showSignup(false)}>
        Return to Login
        <DoubleArrowIcon />
      </h2>
    </>
  );
};

export default SignUpForm;
