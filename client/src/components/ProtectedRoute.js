import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserContext";
const ProtectedRoute = ({}) => {
  const { user, setUser } = useUserAuth();

  if (user == null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
