"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
/**
 * Define the validation rule prompt
 * more validator please check: https://github.com/validatorjs/validator.js
 */
var Validator;
(function (Validator) {
    Validator["isBase64"] = "The parameter must be in base64 format";
    Validator["isBoolean"] = "The parameter must be of type boolean";
    Validator["isDate"] = "The parameter must be in Date format";
    Validator["isEmail"] = "The parameter must be in Email format";
    Validator["isFloat"] = "The parameter must be float";
    Validator["isInt"] = "The parameter must be of type int";
    Validator["isJSON"] = "The parameter must be of type json";
    Validator["isJWT"] = "The parameter must be in JWT token format";
    Validator["isLength"] = "The parameter length cannot be empty";
    Validator["isString"] = "The parameter must be of type string";
    Validator["isURL"] = "The parameter must be in URL format";
})(Validator = exports.Validator || (exports.Validator = {}));
//# sourceMappingURL=valid-tip.js.map