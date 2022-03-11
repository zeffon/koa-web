"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Logger
 */
const log4js_1 = __importDefault(require("log4js"));
const log_config_1 = __importDefault(require("./log-config"));
const config_1 = __importDefault(require("../../config"));
const lodash_1 = __importDefault(require("lodash"));
const ENV = config_1.default.ENV;
// loading log config
log4js_1.default.configure(log_config_1.default);
let infoLogger = log4js_1.default.getLogger('infoLogger');
let errorLogger = log4js_1.default.getLogger('errorLogger');
// format log text
let formatText = {
    // request log
    request: function (ctx) {
        let logText = '';
        logText += `\n==================== REQUEST BEGIN ====================`;
        logText += `\n[REQUEST LOG BEGIN]`;
        logText += `\n  [requestOriginalUrl]: ${ctx.originalUrl},`;
        logText += `\n  [requestIP]: ${ctx.ip},`;
        logText += `\n  [requestAPI]: ${ctx.url},`;
        logText += `\n  [requestMethod]: ${ctx.method},`;
        logText += `\n  [requestParameters]: ${JSON.stringify(ctx.data)}`;
        logText += `\n[REQUEST LOG END]\n`;
        if (ENV === 'dev')
            console.log(logText);
        return logText;
    },
    // response log
    response: function (ctx, data) {
        let logText = '';
        logText += `\n[RESPONSE LOG BEGIN]`;
        logText += `\n  [responseData]: ${JSON.stringify(data)}`;
        logText += `\n[RESPONSE LOG END]`;
        logText += `\n******************** RESPONSE END ********************\n`;
        if (ENV === 'dev')
            console.log(logText);
        return logText;
    },
    // sql query
    query: function (sql, data) {
        let logText = '';
        if (data && lodash_1.default.isArray(data))
            data = JSON.stringify(data);
        logText += `\n[SQL QUERY LOG BEGIN]`;
        logText += `\n  [SQL]: ${sql}`;
        logText += `\n  [SQLData]: ${data}`;
        logText += `\n[SQL QUERY LOG END]\n`;
        if (ENV === 'dev')
            console.log(logText);
        return logText;
    },
    // 错误日志
    error: function (...arg) {
        let logText = '';
        logText += `\n!!!!!!!!!!!!!!!!!!!! ERROR LOG BEGIN !!!!!!!!!!!!!!!!!!!!`;
        for (let i = 0, len = arg.length; i < len; i++) {
            let info = arg[i];
            if (lodash_1.default.isPlainObject(info))
                info = JSON.stringify(info);
            logText += `\n  [errorInfoLog]: ${info}`;
            console.log(info);
        }
        logText += `\n!!!!!!!!!!!!!!!!!!!! ERROR LOG END !!!!!!!!!!!!!!!!!!!!\n`;
        return logText;
    }
};
const Logger = {
    /** request log */
    request: function (ctx) {
        if (ctx.request.url.startsWith('/favicon'))
            return;
        infoLogger.info(formatText.request(ctx));
    },
    /** response log */
    response: function (ctx, data) {
        if (ctx.request.url.startsWith('/favicon'))
            return;
        infoLogger.info(formatText.response(ctx, data));
    },
    /** sql query log */
    query: function (sql, data) {
        infoLogger.info(formatText.query(sql, data));
    },
    /** sql error log */
    error: function (...arg) {
        errorLogger.error(formatText.error(...arg));
    }
};
exports.default = Logger;
//# sourceMappingURL=index.js.map