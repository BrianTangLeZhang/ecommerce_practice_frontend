import axios from "axios";

const url = "http://localhost:5000";

export const getProducts = async (category) => {
  try {
    let params = {};
    if (category !== "all") params.category = category;
    const query = new URLSearchParams(params);
    const res = await axios.get(`${url}/products?${query.toString()}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get(`${url}/categories`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
