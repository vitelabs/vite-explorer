import Koa from 'koa';
import { Nuxt, Builder } from 'nuxt';

async function start() {
  const app = new Koa();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;


  let config = require('../nuxt.config.js');
  config.dev = !(app.env === 'production');

  const nuxt = new Nuxt(config);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

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