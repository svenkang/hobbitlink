const pino = require('pino');

const formatters = {
  level (label, number) {
    return { level: label }
  },
  log (object) {
    return JSON.parse(JSON.stringify(object, null, 2));
  },
}

const logger = defaultConfig =>
  pino({
    ...defaultConfig,
    messageKey: 'message',
    timestamp: false,
    base: undefined,
    mixin: (_context, level) => ({ 
      context: 'NextApplication', 
      timestamp: (new Date().toISOString()),
    }),
    mixinMergeStrategy(mergeObject, mixinObject) {
        return Object.assign({}, mergeObject, mixinObject)
    },
    formatters,
  });

module.exports = {
  logger,
}
