import bodyParser from "koa-bodyparser";
import routes from "./routes";

export default (app, nuxt) => {
  app.use(async (ctx, next) => {
    await next();
  });

  app.use(bodyParser());


  app.use(routes(app));


  app.use(async (ctx, next) => {
    await next();
    ctx.status = 200;
    return new Promise((resolve, reject) => {
      ctx.res.on("close", resolve);
      ctx.res.on("finish", resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject);
      });
    });
  });

};
