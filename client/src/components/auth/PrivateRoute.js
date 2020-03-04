import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {user} = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={props => {
        if (!user.isLoggedIn) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { referer: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
