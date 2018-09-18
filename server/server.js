import axios from "axios";
import config from "../api/config";


config.baseURL = process.env.BASE_URL;

console.log("baseUrl", config.baseURL);
const service = axios.create(config);

// POST  Stringify parameters
service.interceptors.request.use(
  config => {
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
  console.log("service: post request url", url);
  return service({
    method: "post",
    url,
    data
  });
}

export function get(url, data) {
  console.log("service: get request url", url);
  return service({
    method: "get",
    url,
    params: data
  });
}
