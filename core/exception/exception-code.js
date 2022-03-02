"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 自定义HTTP异常错误码
 */
const CODE = new Map([
    [0, 'ok'],
    [9999, '服务器未知异常'],
    [10000, '通用异常'],
    [10001, '通用参数错误'],
    [10002, '资源未找到'],
    [10003, '没有找到合适的登陆处理方法'],
    [10004, '令牌不合法或者过期'],
    [10005, '用户未被授权'],
    [10006, '登陆失败'],
    [20000, '用户类通用错误']
]);
exports.default = CODE;
//# sourceMappingURL=exception-code.js.map