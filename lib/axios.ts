import axiosDefault from "axios";
import {API_URL, AUTH_HEADER_NAME} from "@lib/constants";
import {getCookieOnClient} from "@lib/utils-client";
import {getCookieOnServer} from "@lib/utils-server";
import {isServer} from "@lib/utils";
export const axios = axiosDefault.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  async (config) => {
    const token = isServer() ? await getCookieOnServer(AUTH_HEADER_NAME) : getCookieOnClient(AUTH_HEADER_NAME);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);