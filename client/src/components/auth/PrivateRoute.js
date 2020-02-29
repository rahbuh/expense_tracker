import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
    
      const isAuthenticated = true;  // Needs to get its value from login

      if (!isAuthenticated) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
