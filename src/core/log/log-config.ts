import path from 'path'

/** log root path */
const BASE_LOG_PATH = path.resolve(__dirname, '../../../logs')

/** info path */
const INFO_PATH = '/info'
const INFO_FILE_NAME = 'info'
const INFO_LOG_PATH = BASE_LOG_PATH + INFO_PATH + '/' + INFO_FILE_NAME

/** error path */
const ERROR_PATH = '/error'
const ERROR_FILE_NAME = 'error'
const ERROR_LOG_PATH = BASE_LOG_PATH + ERROR_PATH + '/' + ERROR_FILE_NAME

export default {
  appenders: {
    'rule-console': { type: 'console' },
    infoLogger: {
      type: 'dateFile',
      filename: INFO_LOG_PATH,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 10 * 1024 * 1024, // 10 m
      numBackups: 3,
      path: INFO_PATH
    },
    errorLogger: {
      type: 'dateFile',
      filename: ERROR_LOG_PATH,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 10 * 1024 * 1024, // 10 m
      numBackups: 3,
      path: ERROR_PATH
    }
  },
  categories: {
    default: { appenders: ['rule-console'], level: 'all' },
    infoLogger: { appenders: ['infoLogger'], level: 'all' },
    errorLogger: { appenders: ['errorLogger'], level: 'all' },
    http: { appenders: ['infoLogger'], level: 'info' }
  },
  baseLogPath: BASE_LOG_PATH
}
