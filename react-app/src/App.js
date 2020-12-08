import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import SignUpForm from "./Login/SignUpForm";
import ProtectedRoute from "./services/ProtectedRoute";
import User from "./Profile/User";
import Homepage from "./Homepage/Homepage";
import CreateAvatar from "./Avatar/CreateAvatar";
import { useDispatch } from "react-redux";
import { setUserInfo, authenticate } from "./store/actions/authReducer";
import { getAvatar } from "./store/actions/avatarReducer";
import { getTasks } from "./store/actions/tasksReducer";
import { getCategories } from "./store/actions/categoryReducer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await dispatch(authenticate());
      dispatch([
        setUserInfo(),
        getAvatar(user.id),
        getTasks(user.id),
        getCategories(user.id),
      ]);
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
