import Koa from 'koa';
import config from './config';
import { Nuxt, Builder } from 'nuxt';
import middleware from './middleware';

async function start() {
  const app = new Koa();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || config.server.port;


  let nuxtConfig = require('../nuxt.config.js');
  nuxtConfig.dev = !(app.env === 'production');

  const nuxt = new Nuxt(nuxtConfig);

  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // middlewares are imported here
  middleware(app);

  app.use(async (ctx, next) => {
    await next();
    ctx.status = 200;
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject);
      })
    });
  });

  app.listen(port, host);
  console.log('Server listening on ' + host + ':' + port);
}

start();
