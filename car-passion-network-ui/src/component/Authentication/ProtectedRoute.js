import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./Authentication";

export default function ProtectedRoute({ element: Element, ...rest }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/" />;
}
