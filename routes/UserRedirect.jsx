import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const UserRedirect = ({ children }) => {
  const { user } = useAppContext();
  if (user && user.isAdmin) {
    return <Navigate to="/" />;
  } else if (user && !user.isAdmin) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default UserRedirect;
