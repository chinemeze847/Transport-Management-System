import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (user && user.isAdmin) {
    return children;
  } else if (user && !user.isAdmin) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/landing" />;
  }
};

export default AdminProtectedRoute;
