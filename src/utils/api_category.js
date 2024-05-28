import axios from "axios";

import { url } from "./data";

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

export const updateCategory = async (data) => {
  try {
    const res = await axios.put(
      `${url}/categories/${data._id}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${url}/categories/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
