const Koa = require('koa');
const createRouter = require('./router');
const {
  app: defaultAppLog
} = require('./lib/log');
const {
  AccessToken
} = require('./lib/server');

/**
 * create app
 * 
 * @param {String} register_token
 * @param {String} appid
 * @param {String} secret
 * @param {Logger} [log]
 * @return {Application}
 */
function createApp(register_token, appid, secret, log = defaultAppLog) {
  const app = new Koa();
  // context
  app.context.mount = {
    log,
    accessToken: new AccessToken(appid, secret)
  }
  // middleware
  app.use(async(ctx, next) => {
    ctx.mount.log.info(ctx.request.path);
    await next();
  })
  app.use(createRouter(register_token));
  return app;
}

module.exports = createApp;