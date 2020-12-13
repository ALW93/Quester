import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import SignUpForm from "./Login/SignUpForm";
import ProtectedRoute from "./services/ProtectedRoute";
import Homepage from "./Homepage/Homepage";
import CreateAvatar from "./User/CreateAvatar";
import { useDispatch } from "react-redux";
import { setUserInfo, authenticate } from "./store/actions/authReducer";
import { getAvatar } from "./store/actions/avatarReducer";
import {
  getTasks,
  getComplete,
  getExpired,
} from "./store/actions/tasksReducer";
import { getCategories } from "./store/actions/categoryReducer";
import { getHabits } from "./store/actions/habitReducer";
import { getStats } from "./store/actions/statReducer";
import { getUserFriends, getUserMessages } from "./store/actions/userReducer";
import { WindMillLoading } from "react-loadingg";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await dispatch(authenticate());
      if (user) {
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
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return <WindMillLoading />;
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
      <ProtectedRoute path="/" exact={true}>
        <Homepage />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
