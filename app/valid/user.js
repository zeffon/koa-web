"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidator = void 0;
const validator_1 = require("../../core/validator/validator");
/**
 * 注册校验器
 */
class RegisterValidator extends validator_1.LinValidator {
    constructor() {
        super();
        this.email = [
            new validator_1.Rule('isLength', '至少12个字符，最多32个字符', {
                min: 12,
                max: 32
            }),
            new validator_1.Rule('isEmail', '不符合Email规范')
        ];
        this.password1 = [
            // 用户指定范围 123456 $^
            new validator_1.Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new validator_1.Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ];
        this.password2 = this.password1;
        this.nickname = [
            new validator_1.Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ];
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1;
        const psw2 = vals.body.password2;
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同');
        }
    }
}
exports.RegisterValidator = RegisterValidator;
//# sourceMappingURL=user.js.map