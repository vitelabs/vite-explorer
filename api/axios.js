import axios from "axios";
import config from "./config";

if (process.server) {
  console.log("server");
  config.baseURL = "http://127.0.0.1:8081/api";
} else {
  console.log("client");
  config.baseURL = "/api";  
}

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
    let body = res.data || {};
    if (!body) return;
    if (body.code) {
      throw body;
    }
    return body.data || {};
  },
  error => {
    if (!error.code) {
      error = {
        code: error.response && error.response.status ? error.response.status : "5000",
        msg: error.response && error.response.statusText ? error.response.statusText : "request error"
      };
    }
    return Promise.reject(error);
  }
);

export function post(url, data) {
  return service({
    method: "post",
    url,
    data
  });
}

export function get(url, data) {
  return service({
    method: "get",
    url,
    params: data
  });
}
