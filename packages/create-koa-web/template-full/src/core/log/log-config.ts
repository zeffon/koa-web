import path from 'node:path'

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
    info: {
      type: 'dateFile',
      filename: INFO_LOG_PATH,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 10 * 1024 * 1024, // 10 m
      numBackups: 3,
      daysToKeep: 30,
    },
    error: {
      type: 'dateFile',
      filename: ERROR_LOG_PATH,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 10 * 1024 * 1024, // 10 m
      numBackups: 3,
      daysToKeep: 30,
    },
  },
  categories: {
    default: { appenders: ['rule-console'], level: 'info' },
    info: { appenders: ['info'], level: 'info' },
    error: { appenders: ['error'], level: 'info' },
  },
  baseLogPath: BASE_LOG_PATH,
  /**
   * If you use pm2 run serve, log4js cannot generate log files.
   * You configure the following and add pm2InstanceVar at pm2 start.json.
   * instance_var is equal to pm2InstanceVar
   * {
   *   "apps": [{
   *     "env": {
   *       "NODE_ENV": "development"
   *     },
   *     "name": "koa-web",
   *     "script": "/koa-web/dist/app.js",
   *     "instance_var": "koa-web_log4js_3100",
   *     "cwd": "/koa-web",
   *     "watch": [
   *        "dist"
   *      ],
   *     "error_file":"./logs/pm2/error.log",
   *     "out_file":"./logs/pm2/out.log",
   *     "log_date_format":"YYYY-MM-DD HH:mm:ss",
   *   }]
   * }
   */
  pm2: true,
  pm2InstanceVar: 'koa-web_log4js_3100',
}
