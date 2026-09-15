import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ allowedRole, children }) {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    if (role === "vendor") {
      return <Navigate to="/vendor/dashboard" replace />;
    } else if (role === "inspector") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/public/verify" replace />;
    }
  }

  return children;
}
