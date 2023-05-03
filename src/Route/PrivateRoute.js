import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || userData === "undefined") {
      setIsLoggedIn(false);

      return navigate("/login");
    }
    setIsLoggedIn(true);
  }, [isLoggedIn]);
  return <>{isLoggedIn ? children : null}</>;
};

export default PrivateRoute;
