import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdvisorProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (user && !user.isAdmin) {
    return children;
  } else if (user && user.isAdmin) {
    <Navigate to="/" />;
  } else {
    return <Navigate to="/landing" />;
  }
};

export default AdvisorProtectedRoute;
