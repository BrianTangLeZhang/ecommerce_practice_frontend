import axios from "axios";

const url = "http://localhost:5000";

export const getCategories = async () => {
  try {
    const res = await axios.get(`${url}/categories`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const addCategory = async (data) => {
  try {
    const res = await axios.post(`${url}/categories`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
