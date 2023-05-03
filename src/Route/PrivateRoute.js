import React from "react";
import { useUserStore } from "../stores/useUserStore";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let [userData] = useUserStore((state) => [state.userData]);

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
