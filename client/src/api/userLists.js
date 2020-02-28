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

export { getUserCategoriesAPI, getUserPayTypesAPI };
