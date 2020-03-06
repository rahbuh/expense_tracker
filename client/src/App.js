import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Expenses from "./components/layout/Expenses";
import NoPageFound from "./components/layout/NoPageFound";
import authenticate from "./api/authUser";
import Session from "./helpers/session";
import AuthContext from "./context/auth";
import "./App.css";

const App = () => {
  const [errors, setErrors] = useState([]);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [user, setUser] = useLocalState('user');

  function useLocalState(item) {
    const [local, setState] = useState(JSON.parse(sessionStorage.getItem(item)) || { username: "", isLoggedIn: false });

    function setLocal(newItem) {
      sessionStorage.setItem(item, JSON.stringify(newItem));
      setState(newItem);
    };
    return [local, setLocal]
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = login;
    if (email && password) {
      const { username, token, errors } = await authenticate(email, password);

      if (token) {
        Session.setSession(token);
        setLogin({ email: "", password: "" });
        setErrors([]);
        setUser({ username, isLoggedIn: true });
      }
      if (errors) {
        setErrors(errors);
      }
    } else {
      setErrors([{ msg: "All fields are required" }]);
    }
  };

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogOut = () => {
    setUser({ username: "", isLoggedIn: false });
    Session.deleteSession();
  };

  return (
    <AuthContext.Provider
      value={{ user, handleChange, handleSubmit, handleLogOut, errors }}
    >
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
    </AuthContext.Provider>
  );
};

export default App;
