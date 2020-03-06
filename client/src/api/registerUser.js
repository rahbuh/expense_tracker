import axios from "axios";

const register = async (name, email, password) => {
  const data = JSON.stringify({ name, email, password });
  const url = "/api/users";
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return await axios
    .post(url, data, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const status = error.response.status;
      if (status === 400 || status === 422 || status === 500) {
        return error.response.data;
      } else {
        return { status: error.response.status };
      }
    });
};

export default register;
