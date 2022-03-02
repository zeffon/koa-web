"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const log_1 = __importDefault(require("../log"));
const exception_code_1 = __importDefault(require("./exception-code"));
const http_exception_1 = require("./http-exception");
const UNDEDINED_ERROR_TIP = '未定义的错误码';
/**
 * 全局异常捕获
 */
function catchError(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (error) {
            const isHttpException = error instanceof http_exception_1.HttpException;
            const request = `${ctx.method} ${ctx.path}`;
            logError(error, isHttpException);
            if (isHttpException) {
                const message = getMessage(error);
                const code = getCode(error);
                ctx.status = error.status;
                const data = {
                    code,
                    message,
                    request
                };
                ctx.body = data;
            }
            else if (error.status !== 500) {
                const data = {
                    code: 10001,
                    message: error.message || exception_code_1.default.get(10001),
                    request
                };
                ctx.body = data;
                ctx.status = error.status;
            }
            else {
                const data = {
                    code: 9999,
                    message: exception_code_1.default.get(9999),
                    request
                };
                ctx.body = data;
                ctx.status = error.status;
            }
        }
    });
}
exports.default = catchError;
/**
 * 日志记录
 * @param error error
 * @param isHttpException 是否为自定义的异常
 */
function logError(error, isHttpException) {
    let isSuccess = error instanceof http_exception_1.Success;
    if (isSuccess)
        return;
    if (isHttpException) {
        const code = `错误码: ${getCode(error)}`;
        const message = getMessage(error);
        log_1.default.error('自定义异常', code, message);
    }
    else {
        log_1.default.error('未知错误', error, '未知错误');
    }
}
/**
 * 获取自定义的异常message
 * @param error
 * @returns message
 */
function getMessage(error) {
    const message = (0, lodash_1.isNumber)(error.code)
        ? error.message || exception_code_1.default.get(error.code) || UNDEDINED_ERROR_TIP
        : error.code;
    return message;
}
/**
 * 获取自定义的错误码
 * @param error
 * @returns code
 */
function getCode(error) {
    const code = (0, lodash_1.isNumber)(error.code) ? error.code : 10000;
    return code;
}
//# sourceMappingURL=index.js.map