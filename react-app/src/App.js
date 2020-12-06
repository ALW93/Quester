import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import SignUpForm from "./Login/SignUpForm";
import NavBar from "./Shared/NavBar";
import ProtectedRoute from "./services/ProtectedRoute";
import User from "./Profile/User";
import { authenticate } from "./services/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "./store/actions/auth";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(setAuth(true));
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
      <ProtectedRoute path="/users/:userId" exact={true}>
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true}>
        <NavBar />
        <h1>My Home Page</h1>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
