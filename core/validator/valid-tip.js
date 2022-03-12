"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define the validation rule prompt
 * more validator please check: https://github.com/validatorjs/validator.js
 */
const ValidTip = new Map([
    ['isEmpty', 'The parameter length cannot be empty'],
    ['isLength', 'The parameter length does not match'],
    ['isDate', 'The parameter must be in Date format'],
    ['isEmail', 'The parameter must be in Email format'],
    ['isBase64', 'The parameter must be in base64 format'],
    ['isFloat', 'The parameter must be float format'],
    ['isJSON', 'The parameter must be of type json'],
    ['isJWT', 'The parameter must be in JWT token format'],
    ['isURL', 'The parameter must be in URL format'],
    ['matches', 'check if string matches the pattern.'],
    ['equals', 'check if the string matches the comparison.']
]);
exports.default = ValidTip;
//# sourceMappingURL=valid-tip.js.map