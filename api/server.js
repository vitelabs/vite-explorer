import axios from "axios";

import qs from "qs";
import config from "./config";

config.baseURL = "http://localhost:3001/api";

const service = axios.create(config);

// POST  Stringify parameters
service.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Judge return value
service.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export function post(url, data) {
  console.log("post request url", url);
  return service({
    method: "post",
    url,
    params: data
  });
}

export function get(url, data) {
  console.log("get request url", url);
  return service({
    method: "get",
    url,
    params: data
  });
}
