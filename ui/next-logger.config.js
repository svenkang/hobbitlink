const pino = require('pino')

const logger = defaultConfig =>
  pino({
    ...defaultConfig,
    messageKey: 'message',
    mixin: () => ({ 
      context: 'NextApplication', 
      timestamp: (new Date().toISOString()),
      level: logger.level,
    }),
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l o',
        ignore: 'pid,hostname',
      }
    }
  })


module.exports = {
  logger,
}
