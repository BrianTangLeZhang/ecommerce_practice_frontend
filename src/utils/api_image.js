import axios from "axios";

import { url } from "./data";

export const getImages = async () => {
  const res = await axios.get(`${url}/images`);
  return res.data;
};

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await axios.post(`${url}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
