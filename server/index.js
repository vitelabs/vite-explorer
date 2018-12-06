import Koa from "koa";
import config from "./config";
import { Nuxt, Builder } from "nuxt";
import middleware from "./middleware";

async function start() {
  const app = new Koa();
  const host = process.env.HOST || "0.0.0.0";
  const port = process.env.PORT || config.port;

  let nuxtConfig = require("../nuxt.config.js");
  nuxtConfig.dev = (app.env === "development");
  const nuxt = new Nuxt(nuxtConfig);

  // Build in development
  if (nuxtConfig.dev) {
    await new Builder(nuxt).build();
  }

  // middlewares are imported here
  middleware(app, nuxt);

  app.listen(port, host);
  console.log("Server listening on " + host + ":" + port);
}

start();
