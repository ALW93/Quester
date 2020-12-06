import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setId, setUser } from "../store/actions/auth";
import { showForm } from "../store/actions/utility";
import { TextField, Button } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { setAvatar } from "../store/actions/avatar";
import { getAvatar } from "../services/avatar";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.auth.auth);
  const form = useSelector((state) => state.util.visible);

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    const avatar = await getAvatar(user.id);
    console.log(avatar);

    if (!user.errors) {
      dispatch(setAuth(true));
      dispatch(setId(user.id));
      dispatch(setUser(user));
      dispatch(setAvatar(avatar));
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

  if (authorized) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Quester</h1>
      {form ? (
        <SignUpForm showSignup={showSignup} />
      ) : (
        <>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <TextField
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <TextField
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div>
              <Button type="submit" variant="outlined">
                Login
              </Button>
            </div>
          </form>
          <div onClick={() => showSignup(true)}>
            Sign up Here <DoubleArrowIcon />
          </div>
        </>
      )}
    </>
  );
};

export default LoginForm;
