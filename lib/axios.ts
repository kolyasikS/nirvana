import axiosDefault from "axios";

export const axios = axiosDefault.create({
  baseURL: 'https://localhost:4545'
});