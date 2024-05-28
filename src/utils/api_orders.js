import axios from "axios";

import { url } from "./data";

export const createOrder = async (order) => {
  const res = await axios.post(
    `${url}/orders`, //url
    JSON.stringify(order), //data
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get(`${url}/orders`);
  return res.data;
};

export const updateOrder = async (data) => {
  const res = await axios.put(
    `${url}/orders/${data._id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${url}/orders/${id}`);
  return res.data;
};
