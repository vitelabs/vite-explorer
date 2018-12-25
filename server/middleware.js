import bodyParser from "koa-bodyparser";
import routes from "./routes";
const uuidv1 = require("uuid/v1");


export default (app, nuxt) => {
  app.use(async (ctx, next) => {
    if (!ctx.cookies.get("uuid")) {
      let uuid = uuidv1();
      ctx.cookies.set("uuid", uuid, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
    }
    await next();
  });

  app.use(bodyParser());
  
  app.use(routes(app));

  app.use(async (ctx, next) => {
    await next();
    ctx.status = 200;
    ctx.req.session = ctx.session;
    return new Promise((resolve, reject) => {
      ctx.res.on("close", resolve);
      ctx.res.on("finish", resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject);
      });
    });
  });
};
