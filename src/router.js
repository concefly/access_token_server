const Router = require('koa-router');
const util = require('./lib/util');

/**
 * create router
 * 
 * @param {String} register_token 
 * @return {Middleware}
 */
function createRouter(register_token) {
  const router = new Router();
  router
    .get('/', async(ctx, next) => {
      const {
        signature,
        timestamp,
        nonce,
        echostr
      } = ctx.query;
      const isOk = util.checkSignature(signature, timestamp, nonce, register_token)
      if (isOk) {
        ctx.body = echostr;
      }
    })
    .get('/getAccessToken', async(ctx, next) => {
      const token = await ctx.mount.accessToken.get();
      ctx.body = {
        token
      }
    })
  return router.routes()
}

module.exports = createRouter;