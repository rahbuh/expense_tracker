import axios from "axios";

const authenticate = (email, password) => {
  const data = JSON.stringify({ email, password });
  const url = "/api/auth";
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios
    .post(url, data, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data;
    });
};

export default authenticate;
