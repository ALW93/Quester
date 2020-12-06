import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/actions/auth";
import { showForm } from "../store/actions/utility";
import { TextField, Button } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

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
    if (!user.errors) {
      dispatch(setAuth(true));
    } else {
      setErrors(user.errors);
    }
  };

  const showSignup = () => {
    dispatch(showForm(true));
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
        <SignUpForm />
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
          <div>
            Sign up Here <DoubleArrowIcon onClick={showSignup} />
          </div>
        </>
      )}
    </>
  );
};

export default LoginForm;
