import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../context/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {context => (
      <Route
        {...rest}
        render={props => {
          if (!context.user.isLoggedIn) {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
          return <Component {...props} />;
        }}
      />
    )}
  </AuthConsumer>
);

export default PrivateRoute;
