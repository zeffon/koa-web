/**
 * 日志处理模块
 */
import log4js from 'log4js';
import logConfig from './log-config';
import CONFIG from '../../config';
import _ from 'lodash';

const ENV = CONFIG.ENV;

// 加载配置文件
log4js.configure(logConfig);

// 调用预先定义的日志名称
let infoLogger = log4js.getLogger('infoLogger');
let errorLogger = log4js.getLogger('errorLogger');

// 格式化日志文本
let formatText = {
  // 普通请求日志
  request: function (ctx: any) {
    let logText: string = '';
    logText += `\n==================== 接口请求开始 ====================`;
    logText += `\n[请求日志信息开始]`;
    logText += `\n  [requestOriginalUrl]: ${ctx.originalUrl},`;
    logText += `\n  [requestIP]: ${ctx.ip},`;
    logText += `\n  [requestAPI]: ${ctx.url},`;
    logText += `\n  [requestMethod]: ${ctx.method},`;
    logText += `\n  [requestParameters]: ${JSON.stringify(ctx.data)}`;
    logText += `\n[请求日志信息结束]\n`;
    if (ENV === 'dev') console.log(logText);
    return logText;
  },

  // 响应
  response: function (ctx: any, data?: any) {
    let logText = '';
    logText += `\n[响应日志信息开始]`;
    logText += `\n  [responseData]: ${JSON.stringify(data)}`;
    logText += `\n[响应日志信息结束]`;
    logText += `\n******************** 接口响应结束 ********************\n`;
    if (ENV === 'dev') console.log(logText);
    return logText;
  },

  // 数据库查询
  query: function (sql: any, data?: any) {
    let logText = '';
    if (data && _.isArray(data)) data = JSON.stringify(data);
    logText += `\n[查询数据库日志信息开始]`;
    logText += `\n  [SQL]: ${sql}`;
    logText += `\n  [SQLData]: ${data}`;
    logText += `\n[查询数据库日志信息结束]\n`;
    if (ENV === 'dev') console.log(logText);
    return logText;
  },

  // 错误日志
  error: function (...arg: any) {
    let logText = '';
    logText += `\n!!!!!!!!!!!!!!!!!!!! 错误日志信息开始 !!!!!!!!!!!!!!!!!!!!`;
    for (let i = 0, len = arg.length; i < len; i++) {
      let info = arg[i];
      if (_.isPlainObject(info)) info = JSON.stringify(info);
      logText += `\n  [errorInfoLog]: ${info}`;
      console.log(info);
    }
    logText += `\n!!!!!!!!!!!!!!!!!!!! 错误日志信息结束 !!!!!!!!!!!!!!!!!!!!\n`;
    return logText;
  }
};

interface LoggerOptions {
  request: Function;
  response: Function;
  query: Function;
  error: Function;
  [x: string]: any;
}

const Logger: LoggerOptions = {
  /** 打印请求信息 */
  request: function (ctx: any) {
    if (ctx.request.url.startsWith('/favicon')) return;
    infoLogger.info(formatText.request(ctx));
  },

  /** 打印响应信息 */
  response: function (ctx: any, data?: any) {
    if (ctx.request.url.startsWith('/favicon')) return;
    infoLogger.info(formatText.response(ctx, data));
  },

  /** 打印数据库查询信息 */
  query: function (sql: any, data?: any) {
    infoLogger.info(formatText.query(sql, data));
  },

  /** 打印数据库查询错误信息 */
  error: function (...arg: any) {
    errorLogger.error(formatText.error(...arg));
  }
};
export default Logger;
