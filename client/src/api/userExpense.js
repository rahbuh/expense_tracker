import axios from "axios";

const postExpense = (inputData, token) => {
  const data = JSON.stringify(inputData);
  const url = "/api/expenses";
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
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

export default postExpense;
