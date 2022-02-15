import React from "react";

import { Navigate } from "react-router";

import { useAuth } from "../../store/auth-context";

export default function PrivateRoutes({ children }) {
  const authCtx = useAuth();

  return authCtx.currentUser ? children : <Navigate to="/login" />;
}
