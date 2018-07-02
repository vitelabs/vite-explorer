import axios from "axios";

import qs from "qs";
import config from "./config";

if (process.server) {
  config.baseURL = `http://${process.env.HOST || "localhost"}:${process.env.PORT || 3000}/api`;
}

const service = axios.create(config);

// POST 传参序列化
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

// 返回状态判断
service.interceptors.response.use(
  res => {
    let body = res.data || {};
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
