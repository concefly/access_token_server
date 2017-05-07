const log4js = require('log4js');

const opts = {
  appenders: [{
    type: 'logLevelFilter',
    level: 'trace',
    appender: {
      type: 'file',
      filename: 'server.log',
    }
  }]
}

if (1) {
  opts.appenders.push({
    type: 'logLevelFilter',
    level: 'trace',
    appender: {
      type: 'console'
    }
  })
}

log4js.configure(opts);

module.exports = {
  sys: log4js.getLogger('sys'),
  app: log4js.getLogger('app'),
};