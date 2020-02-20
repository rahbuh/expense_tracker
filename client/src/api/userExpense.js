import axios from "axios";

const postExpense = inputData => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU0ZTFiZGE0ZDFiYWUzY2M0NDU5NzE0In0sImlhdCI6MTU4MjE3NzQ1NCwiZXhwIjoxNTgyMTgxMDU0fQ.MzyTJ8BL_6E5geoX1nD2JlOHxTPokFj8d-YY_tS4Grs";

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
