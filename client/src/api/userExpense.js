import axios from "axios";

const getAllExpensesAPI = async token => {
  const url = "/api/expenses";
  return await axios
    .get(url, { headers: { "x-auth-token": token } })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const status = error.response.status;
      if (status !== 400 && status !== 404 && status !== 500) {
        return { status: error.response.status };
      } else {
        return error.response.data;
      }
    });
};

const getSingleExpenseAPI = async (id, token) => {
  const url = `/api/expenses/${id}`;
  return await axios
    .get(url, { headers: { "x-auth-token": token } })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const status = error.response.status;
      if (status !== 400 && status !== 404 && status !== 500) {
        return { status: error.response.status };
      } else {
        return error.response.data;
      }
    });
};

const postExpenseAPI = async (inputData, token) => {
  const data = JSON.stringify(inputData);
  const url = "/api/expenses";
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  };
  return await axios
    .post(url, data, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const status = error.response.status;
      if (status !== 400 && status !== 500) {
        return { status: error.response.status };
      } else {
        return error.response.data;
      }
    });
};

const updateExpenseAPI = async (inputData, token) => {
  const data = JSON.stringify(inputData);
  const url = `/api/expenses/${inputData._id}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  };
  return await axios
    .put(url, data, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const status = error.response.status;
      if (status !== 400 && status !== 404 && status !== 500) {
        return { status: error.response.status };
      } else {
        return error.response.data;
      }
    });
};

const deleteExpenseAPI = async (id, token) => {
  const url = `/api/expenses/${id}`;
  return await axios
    .delete(url, { headers: { "x-auth-token": token } })
    .then(response => {
      return { success: response.data };
    })
    .catch(error => {
      const status = error.response.status;
      if (status !== 400 && status !== 404 && status !== 500) {
        return { status: error.response.status };
      } else {
        return error.response.data;
      }
    });
};

export {
  getSingleExpenseAPI,
  getAllExpensesAPI,
  postExpenseAPI,
  updateExpenseAPI,
  deleteExpenseAPI
};
