"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = exports.ParamValidator = void 0;
const validator_1 = require("./validator");
Object.defineProperty(exports, "Rule", { enumerable: true, get: function () { return validator_1.Rule; } });
const valid_tip_1 = __importDefault(require("./valid-tip"));
class ParamValidator extends validator_1.LinValidator {
    constructor(schema) {
        super();
        const rules = this._getRules(schema);
        rules.forEach((item) => {
            this[item.key] = item.rules;
        });
    }
    _getRules(schema) {
        const arrayRule = [];
        for (const key in schema) {
            const schemaItem = schema[key];
            const optionalRule = this._isOptionalRule(schemaItem.required);
            const otherRules = this._otherRules(schemaItem.rules);
            const rules = [...optionalRule, ...otherRules];
            arrayRule.push({ key, rules });
        }
        return arrayRule;
    }
    _isOptionalRule(required) {
        return !required ? [new validator_1.Rule('isOptional')] : [];
    }
    _otherRules(rules) {
        if (!rules) {
            return [];
        }
        const otherRules = [];
        rules.forEach((item) => {
            let rule;
            const type = item.type;
            if (type === 'isLength' || type === 'isInt') {
                rule = this._calcLengthRule(item);
            }
            else if (type === 'matches' || type === 'equals') {
                rule = this._calcMatchesRule(item);
            }
            else if (type === 'function') {
                // TODO
                rule = this._calcMatchesRule(item);
            }
            else {
                rule = this._calcUniRule(item);
            }
            otherRules.push(rule);
        });
        return otherRules;
    }
    _calcLengthRule(item) {
        const message = this._getMessage(item.type, item.message);
        return new validator_1.Rule(item.type, message, { min: item.min, max: item.max });
    }
    _calcMatchesRule(item) {
        const message = this._getMessage(item.type, item.message);
        return new validator_1.Rule(item.type, message, item.pattern);
    }
    _calcUniRule(item) {
        const message = this._getMessage(item.type, item.message);
        return new validator_1.Rule(item.type, message);
    }
    _getMessage(name, message) {
        return message ? message : valid_tip_1.default.get(name);
    }
}
exports.ParamValidator = ParamValidator;
//# sourceMappingURL=index.js.map