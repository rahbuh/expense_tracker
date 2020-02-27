import axios from "axios";

const register = (name, email, password) => {
  const data = JSON.stringify({ name, email, password });
  const url = "/api/users";
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios
    .post(url, data, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response.data;
    });
};

export default register;
