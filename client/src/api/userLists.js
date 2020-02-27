import axios from "axios";

const getUserCategoriesAPI = async token => {
  const url = "/api/users/categories";

  return await axios
    .get(url, { headers: { "x-auth-token": token } })
    .then(response => {
      return { success: response.data };
    })
    .catch(error => {
      return { error };
    });
};

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

export { getUserCategoriesAPI, updateUserCategoriesAPI };
