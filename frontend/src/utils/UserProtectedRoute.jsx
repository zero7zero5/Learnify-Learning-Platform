import React from "react";
import { Navigate, Outlet, useActionData, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserProtectedRoute() {
  const userLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const role = useSelector((state) => state.userReducer.userDetails.role);
  let location = useLocation();
  return userLoggedIn && role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
