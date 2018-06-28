import Router from 'koa-trie-router';

const router = new Router();

const users = [
  {name: 'zhoudan'}
];

export default (app) => {
  router.get('/api/user', async (ctx, next) => {
    ctx.type = "json";
    ctx.body = users;
  });

  return router.middleware();
}
