import React from "react";
import { useUserStore } from "../stores/useUserStore";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  let [userData] = useUserStore((state) => [state.userData]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
