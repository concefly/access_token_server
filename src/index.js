const config = require('config');
const createApp = require('./app');
const {
  sys: log
} = require('./lib/log')

const app = createApp(
  config.get('register_token'),
  config.get('appid'),
  config.get('appsecret')
)

app.listen(config.get('port'));

log.info('listening on', config.get('port'))