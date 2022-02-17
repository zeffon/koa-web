import { Rule, LinValidator } from './validator';
import UnifyResponse from '../exception/unify-response';
import _ from 'lodash';

class ValidatorParam extends LinValidator {
  constructor() {
    super();
  }

  protected setRule(rule: any) {
    if (!_.isArray(rule.rules) || rule.rules.length === 0)
      UnifyResponse.parameterException(10001);
    let ruleList = [];
    if (_.isArray(rule.rules[0])) {
      rule.rules.forEach((item: any) => {
        ruleList.push(new Rule(item[0], item[1]));
      });
    } else {
      ruleList.push(new Rule(rule.rules[0], rule.rules[1]));
    }
    // @ts-ignore
    this[rule.key] = ruleList;
  }
}

/**
 * @params { key, rules => [type, msg, rule] || [ [type, msg, rule], ... ] }
 * @description: 校验一个参数
 * @update 2021-01-20 15:52:12
 */
export class ValidatorParameter extends ValidatorParam {
  constructor(rules: any) {
    super();
    if (_.isPlainObject(rules)) {
      this.setRule(rules);
    } else {
      UnifyResponse.parameterException(10001);
    }
  }
}

/**
 * @author chen
 * @params
 * @description: 校验多个参数
 * @update 2021-01-20 15:53:45
 */
export class ValidatorParameters extends ValidatorParam {
  constructor(rules: any) {
    super();
    if (_.isArray(rules)) {
      for (let i = 0, len = rules.length; i < len; i++) {
        let rule = rules[i];
        this.setRule(rule);
      }
    } else {
      UnifyResponse.parameterException(10001);
    }
  }
}

/**
 * 校验参数是否在指定范围内容
 */
export const validateRange = (value: any, data: any[], message?: string) => {
  if (value || value === 0 || value === false) {
    let flag = false;
    data.find((val) => {
      if (value == val) {
        flag = true;
        return true;
      }
    });
    if (flag) return value;
    else UnifyResponse.parameterException(10001);
  } else return value;
};
