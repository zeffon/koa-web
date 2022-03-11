"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifyResponse = void 0;
const http_exception_1 = require("./http-exception");
const SUCCESS_CODE = 0;
/**
 * Unify Response
 */
class UnifyResponse {
    /**
     * Get success
     * @param code errorCode
     * @param message tip message
     */
    getSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.GetSuccess(code, message);
    }
    /**
     * Create Success
     * @param code errorCode
     * @param message tip message
     */
    createSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.CreateSuccess(code, message);
    }
    /**
     * Update Success
     * @param code errorCode
     * @param message tip message
     */
    updateSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.UpdateSuccess(code, message);
    }
    /**
     * 删除成功
     * @param code errorCode
     * @param message tip message
     */
    deleteSuccess({ code = SUCCESS_CODE, message = '' }) {
        throw new http_exception_1.DeleteSuccess(code, message);
    }
    /**
     * Parameter Exception
     * @param codeOrMessage errorCode | tip message
     */
    parameterException(codeOrMessage) {
        throw new http_exception_1.ParameterException(codeOrMessage);
    }
    /**
     * Un Authenticated Exception
     * @param code errorCode
     */
    unAuthenticatedException(code) {
        throw new http_exception_1.UnAuthenticatedException(code);
    }
    /**
     * Forbidden Exception
     * @param code errorCode
     */
    forbiddenException(code) {
        throw new http_exception_1.ForbiddenException(code);
    }
    /**
     * Not Found Exception
     * @param code errorCode
     */
    notFoundException(code) {
        throw new http_exception_1.NotFoundException(code);
    }
    /**
     * server Error
     * @param code errorCode
     */
    serverErrorException(code) {
        throw new http_exception_1.ServerErrorException(code);
    }
}
exports.UnifyResponse = UnifyResponse;
//# sourceMappingURL=unify-response.js.map