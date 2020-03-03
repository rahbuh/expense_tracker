import React, { useState } from "react";
import authenticate from "../../api/authUser";
import Session from "../../helpers/session";
import { Alert } from "../auth/Alert";
const { Provider, Consumer } = React.createContext({
  username: "",
  isLoggedIn: ""
});

const AuthProvider = props => {
  const [errors, setErrors] = useState([]);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [user, setUser] = useState({
    username: "",
    isLoggedIn: false
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = login;
    if (email && password) {
      const { username, token, errors } = await authenticate(email, password);

      if (token) {
        Session.setSession(token);
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
    Session.deleteSession()
  }

  const alert = errors.map((err, index) => (
    <Alert key={index} className={"alert alert-danger"} message={err.msg} />
  ));

  const success = <Alert className={"alert alert-success"} message={"Success!"}/>

  return (
    <Provider value={{ user, handleChange, handleSubmit, handleLogOut, alert }}>
      {props.children}
    </Provider>
  );
};

export { AuthProvider, Consumer as AuthConsumer };
