import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import register from "../../api/registerUser";
import { Alert } from "./Alert";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const [errors, setErrors] = useState([]);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = user;

    if (username && email && password && password2) {
      if (password === password2) {
        register(username, email, password).then(({ success, errors }) => {
          if (success) {
            setUser({
              username: "",
              email: "",
              password: "",
              password2: ""
            });
            setErrors([]);
            setRegisterSuccess(true);
          }
          if (errors) {
            setErrors({ errors });
          }
        });
      } else {
        setErrors([{ msg: "Passwords must match" }]);
      }
    } else {
      setErrors([{ msg: "All fields are required" }]);
    }
  };

  const alert = errors.map((error, index) => (
    <Alert key={index} className={"alert alert-danger"} message={error.msg} />
  ));

  if (registerSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { msg: "Registration successful. Please log in." }
        }}
      />
    );
  }

  return (
    <div className="wrapper">
      <h1 className="large text-golden">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      {alert}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="username"
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <input type="submit" className="btn btn-standard" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
