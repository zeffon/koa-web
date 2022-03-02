"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
/** 日志根目录 */
const BASE_LOG_PATH = path_1.default.resolve(__dirname, '../../../logs');
/** 普通日志信息 */
const INFO_PATH = '/info';
const INFO_FILE_NAME = 'info';
const INFO_LOG_PATH = BASE_LOG_PATH + INFO_PATH + '/' + INFO_FILE_NAME;
/** 错误日志信息 */
const ERROR_PATH = '/error';
const ERROR_FILE_NAME = 'error';
const ERROR_LOG_PATH = BASE_LOG_PATH + ERROR_PATH + '/' + ERROR_FILE_NAME;
exports.default = {
    // 日志格式等设置
    appenders: {
        'rule-console': { type: 'console' },
        infoLogger: {
            type: 'dateFile',
            filename: INFO_LOG_PATH,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 10 * 1024 * 1024,
            numBackups: 3,
            path: INFO_PATH
        },
        errorLogger: {
            type: 'dateFile',
            filename: ERROR_LOG_PATH,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 10 * 1024 * 1024,
            numBackups: 3,
            path: ERROR_PATH
        }
    },
    // 供外部调用的名称与对应设置定义
    categories: {
        default: { appenders: ['rule-console'], level: 'all' },
        infoLogger: { appenders: ['infoLogger'], level: 'all' },
        errorLogger: { appenders: ['errorLogger'], level: 'all' },
        http: { appenders: ['infoLogger'], level: 'info' }
    },
    baseLogPath: BASE_LOG_PATH
};
//# sourceMappingURL=log-config.js.map