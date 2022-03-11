/**
 * Logger
 */
import log4js from 'log4js'
import logConfig from './log-config'
import CONFIG from '../../config'
import _ from 'lodash'

const ENV = CONFIG.ENV

// loading log config
log4js.configure(logConfig)

let infoLogger = log4js.getLogger('infoLogger')
let errorLogger = log4js.getLogger('errorLogger')

// format log text
let formatText = {
  // request log
  request: function (ctx: any) {
    let logText: string = ''
    logText += `\n==================== REQUEST BEGIN ====================`
    logText += `\n[REQUEST LOG BEGIN]`
    logText += `\n  [requestOriginalUrl]: ${ctx.originalUrl},`
    logText += `\n  [requestIP]: ${ctx.ip},`
    logText += `\n  [requestAPI]: ${ctx.url},`
    logText += `\n  [requestMethod]: ${ctx.method},`
    logText += `\n  [requestParameters]: ${JSON.stringify(ctx.data)}`
    logText += `\n[REQUEST LOG END]\n`
    if (ENV === 'dev') console.log(logText)
    return logText
  },

  // response log
  response: function (ctx: any, data?: any) {
    let logText = ''
    logText += `\n[RESPONSE LOG BEGIN]`
    logText += `\n  [responseData]: ${JSON.stringify(data)}`
    logText += `\n[RESPONSE LOG END]`
    logText += `\n******************** RESPONSE END ********************\n`
    if (ENV === 'dev') console.log(logText)
    return logText
  },

  // sql query
  query: function (sql: any, data?: any) {
    let logText = ''
    if (data && _.isArray(data)) data = JSON.stringify(data)
    logText += `\n[SQL QUERY LOG BEGIN]`
    logText += `\n  [SQL]: ${sql}`
    logText += `\n  [SQLData]: ${data}`
    logText += `\n[SQL QUERY LOG END]\n`
    if (ENV === 'dev') console.log(logText)
    return logText
  },

  // 错误日志
  error: function (...arg: any) {
    let logText = ''
    logText += `\n!!!!!!!!!!!!!!!!!!!! ERROR LOG BEGIN !!!!!!!!!!!!!!!!!!!!`
    for (let i = 0, len = arg.length; i < len; i++) {
      let info = arg[i]
      if (_.isPlainObject(info)) info = JSON.stringify(info)
      logText += `\n  [errorInfoLog]: ${info}`
      console.log(info)
    }
    logText += `\n!!!!!!!!!!!!!!!!!!!! ERROR LOG END !!!!!!!!!!!!!!!!!!!!\n`
    return logText
  }
}

interface LoggerOptions {
  request: Function
  response: Function
  query: Function
  error: Function
  [x: string]: any
}

const Logger: LoggerOptions = {
  /** request log */
  request: function (ctx: any) {
    if (ctx.request.url.startsWith('/favicon')) return
    infoLogger.info(formatText.request(ctx))
  },

  /** response log */
  response: function (ctx: any, data?: any) {
    if (ctx.request.url.startsWith('/favicon')) return
    infoLogger.info(formatText.response(ctx, data))
  },

  /** sql query log */
  query: function (sql: any, data?: any) {
    infoLogger.info(formatText.query(sql, data))
  },

  /** sql error log */
  error: function (...arg: any) {
    errorLogger.error(formatText.error(...arg))
  }
}
export default Logger
