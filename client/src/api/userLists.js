import axios from "axios";

const getUserCategoriesAPI = async token => {
  const url = "/api/users/categories";
  return await axios
    .get(url, { headers: { "x-auth-token": token } })
    .then(response => {
      return { success: response.data.categories };
    })
    .catch(error => {
      return { error };
    });
};

const getUserPayTypesAPI = async token => {
  const url = "/api/users/paytype";
  return await axios
    .get(url, { headers: { "x-auth-token": token } })
    .then(response => {
      return { success: response.data.payType };
    })
    .catch(error => {
      return { error };
    });
};


// TO BE COMPLETED
const updateUserCategoriesAPI = async (listData, token) => {
  const data = JSON.stringify(listData);
  const url = `/api/users/categories/${listData._id}`;
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
      return error.response.data;
    });
};

export { getUserCategoriesAPI, getUserPayTypesAPI, updateUserCategoriesAPI };
