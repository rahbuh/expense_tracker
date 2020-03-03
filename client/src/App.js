import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Expenses from "./components/layout/Expenses";
import NoPageFound from "./components/layout/NoPageFound";
import { AuthProvider } from "./components/context/authContext";

import "./App.css";

const App = (props) => {
  return (
    <AuthProvider>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/user/expenses" component={Expenses} />
              <Route component={NoPageFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthProvider>
  );
};

export default App;
