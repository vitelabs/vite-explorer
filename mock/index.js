const Koa = require("koa");
const config = require("./config");
const routerStart = require("./routes");

async function start(router) {
  const app = new Koa();
  app.use(router.middleware());
  app.listen(config.port, config.host);
  console.log("Server listening on " + config.host + ":" + config.port);
}

routerStart(start);
