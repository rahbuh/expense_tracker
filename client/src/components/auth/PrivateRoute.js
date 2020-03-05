import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (user.isLoggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: "/login" }} />;
      }}
    />
  );
};

export default PrivateRoute;
