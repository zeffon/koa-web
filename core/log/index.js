"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 日志处理模块
 */
const log4js_1 = __importDefault(require("log4js"));
const log_config_1 = __importDefault(require("./log-config"));
const config_1 = __importDefault(require("../../config"));
const lodash_1 = __importDefault(require("lodash"));
const ENV = config_1.default.ENV;
// 加载配置文件
log4js_1.default.configure(log_config_1.default);
// 调用预先定义的日志名称
let infoLogger = log4js_1.default.getLogger('infoLogger');
let errorLogger = log4js_1.default.getLogger('errorLogger');
// 格式化日志文本
let formatText = {
    // 普通请求日志
    request: function (ctx) {
        let logText = '';
        logText += `\n==================== 接口请求开始 ====================`;
        logText += `\n[请求日志信息开始]`;
        logText += `\n  [requestOriginalUrl]: ${ctx.originalUrl},`;
        logText += `\n  [requestIP]: ${ctx.ip},`;
        logText += `\n  [requestAPI]: ${ctx.url},`;
        logText += `\n  [requestMethod]: ${ctx.method},`;
        logText += `\n  [requestParameters]: ${JSON.stringify(ctx.data)}`;
        logText += `\n[请求日志信息结束]\n`;
        if (ENV === 'dev')
            console.log(logText);
        return logText;
    },
    // 响应
    response: function (ctx, data) {
        let logText = '';
        logText += `\n[响应日志信息开始]`;
        logText += `\n  [responseData]: ${JSON.stringify(data)}`;
        logText += `\n[响应日志信息结束]`;
        logText += `\n******************** 接口响应结束 ********************\n`;
        if (ENV === 'dev')
            console.log(logText);
        return logText;
    },
    // 数据库查询
    query: function (sql, data) {
        let logText = '';
        if (data && lodash_1.default.isArray(data))
            data = JSON.stringify(data);
        logText += `\n[查询数据库日志信息开始]`;
        logText += `\n  [SQL]: ${sql}`;
        logText += `\n  [SQLData]: ${data}`;
        logText += `\n[查询数据库日志信息结束]\n`;
        if (ENV === 'dev')
            console.log(logText);
        return logText;
    },
    // 错误日志
    error: function (...arg) {
        let logText = '';
        logText += `\n!!!!!!!!!!!!!!!!!!!! 错误日志信息开始 !!!!!!!!!!!!!!!!!!!!`;
        for (let i = 0, len = arg.length; i < len; i++) {
            let info = arg[i];
            if (lodash_1.default.isPlainObject(info))
                info = JSON.stringify(info);
            logText += `\n  [errorInfoLog]: ${info}`;
            console.log(info);
        }
        logText += `\n!!!!!!!!!!!!!!!!!!!! 错误日志信息结束 !!!!!!!!!!!!!!!!!!!!\n`;
        return logText;
    }
};
const Logger = {
    /** 打印请求信息 */
    request: function (ctx) {
        if (ctx.request.url.startsWith('/favicon'))
            return;
        infoLogger.info(formatText.request(ctx));
    },
    /** 打印响应信息 */
    response: function (ctx, data) {
        if (ctx.request.url.startsWith('/favicon'))
            return;
        infoLogger.info(formatText.response(ctx, data));
    },
    /** 打印数据库查询信息 */
    query: function (sql, data) {
        infoLogger.info(formatText.query(sql, data));
    },
    /** 打印数据库查询错误信息 */
    error: function (...arg) {
        errorLogger.error(formatText.error(...arg));
    }
};
exports.default = Logger;
//# sourceMappingURL=index.js.map