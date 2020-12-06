import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/actions/auth";
import { TextField, Button } from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

const SignUpForm = ({ showSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.auth.auth);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        dispatch(setAuth(true));
      } else {
        setErrors(user.errors);
      }
    } else {
      setErrors(["Passwords do not match!"]);
    }
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
      <h2>Sign Up</h2>
      {errors.map((error) => (
        <div>{error}</div>
      ))}
      <form onSubmit={onSignUp}>
        <div>
          <TextField
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
          />
        </div>
        <div>
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          />
        </div>
        <div>
          <TextField
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
      <div>
        Return to Login
        <DoubleArrowIcon onClick={() => showSignup(false)} />
      </div>
    </>
  );
};

export default SignUpForm;
