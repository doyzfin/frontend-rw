import React from "react";
import { Route, Redirect } from "react-router-dom";

//..rest berisi path dan exact
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated && restricted ? (
            <Redirect to="/learning/basic-home" />
          ) : (
            <Component {...props} />
          )
        }
      />
    ),
    (
      <Route
        {...rest}
        render={(props) =>
          // {
          //   if (isAuthenticated && restricted) {
          //     <Redirect to="/home" />;
          //   } else if (!isAuthenticated) {
          //     <Redirect to="/login" />;
          //   } else {
          //     <Component {...props} />;
          //   }
          // }
          isAuthenticated && restricted ? (
            <Redirect to="/home" />
          ) : (
            <Component {...props} />
          )
        }
      />
    )
  );
};

export default PublicRoute;
