import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./Authentication";

export default function ProtectedHome({ element: Element, ...rest }) {
  return !isAuthenticated() ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/dashboard" />
  );
}
