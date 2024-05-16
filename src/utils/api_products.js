import axios from "axios";

const url = "http://localhost:5000";

export const getProducts = async (category, page) => {
  try {
    let params = {
      page: page,
    };
    if (category !== "all") params.category = category;
    const query = new URLSearchParams(params);
    const res = await axios.get(`${url}/products?${query.toString()}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getProduct = async (id) => {
  try {
    const res = await axios.get(`${url}/products/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const addProduct = async (data) => {
  const res = await axios.post(
    `${url}/products`, //url
    JSON.stringify(data), //data
    {
      headers: {
        "Content-Type": "application/json", //tell the API you are sending JSON data(recommanded)
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (data) => {
  const res = await axios.delete(`${url}/products/${data.id}`, {
    headers: {
      Authorization: "Bearer " + data.token, // include token in the API
    },
  });
  return res.data;
};

export const getCategories = async () => {
  try {
    const res = await axios.get(`${url}/categories`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = async (data) => {
  const res = await axios.put(
    `${url}/products/${data.id}`, // url of the PUT API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return res.data;
};
