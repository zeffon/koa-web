"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidator = void 0;
const validator_1 = require("../../core/validator/validator");
/**
 * Register Validator
 */
class RegisterValidator extends validator_1.LinValidator {
    constructor() {
        super();
        this.email = [
            new validator_1.Rule('isLength', 'Min 12 characters, max 32 characters', {
                min: 6,
                max: 32
            }),
            new validator_1.Rule('isEmail', 'Please enter email format')
        ];
        this.password1 = [
            new validator_1.Rule('isLength', 'Password has min 6 characters, max 32 characters', {
                min: 6,
                max: 32
            }),
            new validator_1.Rule('matches', 'Password does not meet specifications', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ];
        this.password2 = this.password1;
        this.nickname = [
            new validator_1.Rule('isLength', 'Nickname does not match the length', {
                min: 4,
                max: 32
            })
        ];
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1;
        const psw2 = vals.body.password2;
        if (psw1 !== psw2) {
            throw new Error('Both passwords must be the same');
        }
    }
}
exports.RegisterValidator = RegisterValidator;
//# sourceMappingURL=user.js.map