import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import SignUpForm from "./Login/SignUpForm";
import NavBar from "./Shared/NavBar";
import ProtectedRoute from "./services/ProtectedRoute";
import User from "./Profile/User";
import Homepage from "./Homepage/Homepage";
import CreateAvatar from "./Avatar/CreateAvatar";
import { authenticate } from "./services/auth";
import { useDispatch } from "react-redux";
import { setAuth, setId, setUser } from "./store/actions/auth";
import { getAvatar } from "./services/avatar";
import { setAvatar } from "./store/actions/avatar";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      const avatar = await getAvatar(user.id);
      if (!user.errors && avatar) {
        dispatch(setAuth(true));
        dispatch(setId(user.id));
        dispatch(setUser(user));
        dispatch(setAvatar(avatar));
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route path="/login" exact={true}>
        <LoginForm />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm />
      </Route>
      <Route path="/create-avatar">
        <CreateAvatar />
      </Route>
      <ProtectedRoute path="/users/:userId" exact={true}>
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true}>
        <Homepage />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
