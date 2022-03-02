"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifyResponse = void 0;
const http_exception_1 = require("./http-exception");
const SUCCESS_CODE = 0;
class UnifyResponse {
    /**
     * 获取成功
     * @param code 错误码
     * @param message 自定义错误提示
     */
    getSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.GetSuccess(code, message);
    }
    /**
     * 创建成功
     * @param code 错误码
     * @param message 自定义错误提示
     */
    createSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.CreateSuccess(code, message);
    }
    /**
     * 更新成功
     * @param code 错误码
     * @param message 自定义错误提示
     */
    updateSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.UpdateSuccess(code, message);
    }
    /**
     * 删除成功
     * @param code 错误码
     * @param message 自定义错误提示
     */
    deleteSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.DeleteSuccess(code, message);
    }
    /**
     * 参数异常
     * @param code 错误码 | 自定义错误提示
     */
    parameterException(code) {
        throw new http_exception_1.ParameterException(code);
    }
    /**
     * 授权异常
     * @param code 错误码
     */
    unAuthenticatedException(code) {
        throw new http_exception_1.UnAuthenticatedException(code);
    }
    /**
     * 访问异常
     * @param code 错误码
     */
    forbiddenException(code) {
        throw new http_exception_1.ForbiddenException(code);
    }
    /**
     * 资源获取不到异常
     * @param code 错误码
     */
    notFoundException(code) {
        throw new http_exception_1.NotFoundException(code);
    }
    /**
     * 服务器异常
     * @param code 错误码
     */
    serverErrorException(code) {
        throw new http_exception_1.ServerErrorException(code);
    }
}
exports.UnifyResponse = UnifyResponse;
//# sourceMappingURL=unify-response.js.map