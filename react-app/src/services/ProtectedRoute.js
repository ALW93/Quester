import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const authorized = useSelector((state) => state.auth.auth);
  const avatar = useSelector((state) => state.avatar.avatar);

  if (!authorized) {
    return <Redirect to="/login" />;
  }

  if (!avatar) {
    return <Redirect to="/create-avatar" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
