import axios from "axios";
import config from "./config";

// config.baseURL = "http://10.2.16.37:8081/api";
config.baseURL = "http://132.232.138.139:8080/test/api";
// config.baseURL = "http://localhost:3001/api";

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
