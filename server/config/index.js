let rcActivityApi = "https://open.meituan.com/";

export default {
  port: 3000,
  apiPrefix: "/api",
  apiConfig: [{
    prefix: "/block/list",
    server: rcActivityApi,
    // map(path) {
    //   return path.replace(/\/api/, "");
    // }
  }]
};
