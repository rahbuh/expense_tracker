import React, { useState } from "react";
import { Link } from "react-router-dom";
import authenticate from "../../api/authUser";
import Session from "../../api/Session";
import { Alert } from "./Alert";

const Login = props => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);
  const [registerSuccess, setRegisterSuccess] = useState(props.location.state);

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = login;
    if (email && password) {
      const { token, errors } = await authenticate(email, password);
      setRegisterSuccess("");

      if (token) {
        Session.setSession(token);
        props.history.push("/user/expenses");  
      }
      if (errors) {
        setErrors(errors);
      }
    } else {
      setErrors([{ msg: "All fields are required" }]);
    }
  };

  const errorMsg = errors.map((err, index) => (
    <Alert key={index} className={"alert alert-danger"} message={err.msg} />
  ));

  return (
    <div className="wrapper">
      <h1 className="large text-golden">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      {errorMsg}
      {registerSuccess ? (
        <Alert
          className={"alert alert-success"}
          message={registerSuccess.msg}
        />
      ) : null}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <input type="submit" className="btn btn-standard" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
