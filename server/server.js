import axios from "axios";

export function post(url, data) {
  console.log("service: post", url);
  return axios.post(
    url,
    data
  );
}

export function get(url, data) {
  console.log("service: get", url);
  return axios.get(
    url,
    { params: data }
  );
}
