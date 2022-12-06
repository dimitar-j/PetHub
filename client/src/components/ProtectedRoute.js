import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const ProtectedRoute = ({}) => {
  const { user, setUser } = useContext(UserContext);
  if (user == null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
