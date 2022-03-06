"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = exports.ParamValidator = void 0;
const validator_1 = require("./validator");
Object.defineProperty(exports, "Rule", { enumerable: true, get: function () { return validator_1.Rule; } });
/**
 * 校验一个Schema模型对象
 * {key: {rules: [new Rule('isEmail', '不符合Email规范'), ...]}}
 */
class ParamValidator extends validator_1.LinValidator {
    constructor(schema) {
        super();
        const rules = this._getRules(schema);
        rules.forEach((item) => {
            // @ts-ignore
            this[item.key] = item.rules;
        });
    }
    _getRules(schema) {
        const array = [];
        for (const key in schema) {
            const rules = schema[key].rules;
            if (rules && rules.length !== 0) {
                const obj = { key, rules };
                array.push(obj);
            }
        }
        return array;
    }
}
exports.ParamValidator = ParamValidator;
//# sourceMappingURL=index.js.map