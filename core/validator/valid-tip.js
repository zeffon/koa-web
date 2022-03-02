"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
/**
 * 必传参数不满足条件时提示文本
 * 这里只列举常用的校验格式提示，更多请参考 validator 工具https://github.com/validatorjs/validator.js
 */
var Validator;
(function (Validator) {
    Validator["isBase64"] = "\u53C2\u6570\u5FC5\u987B\u4E3Abase64\u683C\u5F0F";
    Validator["isBoolean"] = "\u53C2\u6570\u5FC5\u987B\u4E3Aboolean\u7C7B\u578B";
    Validator["isDate"] = "\u53C2\u6570\u5FC5\u987B\u4E3A\u65F6\u95F4\u683C\u5F0F";
    Validator["isEmail"] = "\u53C2\u6570\u5FC5\u987B\u4E3A\u90AE\u7BB1\u683C\u5F0F";
    Validator["isFloat"] = "\u53C2\u6570\u5FC5\u987B\u4E3A\u6D6E\u70B9\u578B";
    Validator["isInt"] = "\u53C2\u6570\u5FC5\u987B\u4E3A\u6574\u578B";
    Validator["isJSON"] = "\u53C2\u6570\u5FC5\u987B\u4E3AJSON\u683C\u5F0F";
    Validator["isJWT"] = "\u53C2\u6570\u5FC5\u987B\u4E3AJWT token\u683C\u5F0F";
    Validator["isLength"] = "\u53C2\u6570\u5FC5\u4F20";
    Validator["isString"] = "\u53C2\u6570\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32";
    Validator["isURL"] = "\u53C2\u6570\u5FC5\u987B\u4E3AURL\u683C\u5F0F";
})(Validator = exports.Validator || (exports.Validator = {}));
//# sourceMappingURL=valid-tip.js.map