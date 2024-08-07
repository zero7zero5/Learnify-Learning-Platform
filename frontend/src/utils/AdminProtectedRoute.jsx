import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import   AdminDashBoard   from "../pages/AdminDashboard"

export default function AdminProtectedRoute() {
  const adminLoggedIn = useSelector((state) => state.adminReducer.isLoggedIn);
  const role = useSelector(
    (state) => state.adminReducer.adminDetails.role
  );
  let location = useLocation();
  return adminLoggedIn && role === "admin" ? (
    <AdminDashBoard />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
