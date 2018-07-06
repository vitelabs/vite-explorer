// const proxy = require("koa-proxy");
// import config from "../config";

export default async (ctx, next) => {
  // console.log("path", ctx.path);
  // if (ctx.path.indexOf("/api" + config.apiConfig[0].prefix) === 0) {
  //   return await proxy({
  //     host: config.apiConfig[0].server,
  //     // map: config.apiConfig[0].map,
  //   });
  // }
  await next();
};