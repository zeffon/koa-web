import { Rule, LinValidator } from './validator';
import _ from 'lodash';

/**
 * 校验一个Schema模型对象
 * {key: {rules: [new Rule('isEmail', '不符合Email规范'), ...]}}
 */
class ParamValidator extends LinValidator {
  constructor(schema: any) {
    super();
    const rules = this._getRules(schema);
    rules.forEach((item) => {
      // @ts-ignore
      this[item.key] = item.rules;
    });
  }

  _getRules(schema: any) {
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

export { ParamValidator, Rule };
