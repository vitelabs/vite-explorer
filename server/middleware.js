import bodyParser from "koa-bodyparser";
import routes from "./routes";

export default (app) => {
  app.use(async (ctx, next) => {
    await next();
  });

  app.use(bodyParser());
  app.use(routes(app));
};
