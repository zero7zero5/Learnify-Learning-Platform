import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InstructorProtectedRoute() {
  const userLoggedIn = useSelector(
    (state) => state.instructorReducer.isLoggedIn
  );
  const role = useSelector(
    (state) => state.instructorReducer.instructorDetails.role
  );
  let location = useLocation();
  return userLoggedIn && role === "instructor" ? (
    <Outlet />
  ) : (
    <Navigate to="/instructor-login" state={{ from: location }} replace />
  );
}
