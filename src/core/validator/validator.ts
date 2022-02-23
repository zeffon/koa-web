import { Context } from 'koa';
import validator from 'validator';
import { findMembers } from '../tool';
import { get, last, set, cloneDeep } from 'lodash';

class LinValidator {
  data: any = {};
  parsed: any = {};
  alias: any = {};
  constructor() {
    this.data = {};
    this.parsed = {};
  }

  _assembleAllParams(ctx: Context) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      path: ctx.params,
      header: ctx.request.header
    };
  }

  get(path: string, parsed = true) {
    if (parsed) {
      const value = get(this.parsed, path, null);
      if (value == null) {
        const keys = path.split('.');
        const key = last(keys);
        return get(this.parsed.default, key as any);
      }
      return value;
    } else {
      return get(this.data, path);
    }
  }

  _findMembersFilter(key: any) {
    if (/validate([A-Z])\w+/g.test(key)) {
      return true;
    }
    // @ts-ignore
    if (this[key] instanceof Array) {
      // @ts-ignore
      this[key].forEach((value: any) => {
        const isRuleType = value instanceof Rule;
        if (!isRuleType) {
          throw new Error('验证数组必须全部为Rule类型');
        }
      });
      return true;
    }
    return false;
  }

  async validate(ctx: Context, alias = {}) {
    this.alias = alias;
    let params = this._assembleAllParams(ctx);
    this.data = cloneDeep(params);
    this.parsed = cloneDeep(params);

    const memberKeys = findMembers(this, {
      filter: this._findMembersFilter.bind(this)
    });

    const errorMsgs = [];
    // const map = new Map(memberKeys)
    for (let key of memberKeys) {
      const result = await this._check(key, alias);
      if (!result.success) {
        errorMsgs.push(result.msg);
      }
    }
    if (errorMsgs.length !== 0) {
      global.UnifyResponse.parameterException(errorMsgs.join(' '));
    }
    ctx.v = this;
    return this;
  }

  async _check(key: string, alias = {}) {
    // @ts-ignore
    const isCustomFunc = typeof this[key] === 'function';
    let result: any = {};
    if (isCustomFunc) {
      try {
        // @ts-ignore
        await this[key](this.data);
        // @ts-ignore
        result = new RuleResult(true);
      } catch (error: any) {
        // @ts-ignore
        result = new RuleResult(
          false,
          error.msg || error.message || '参数错误'
        );
      }
      // 函数验证
    } else {
      // 属性验证, 数组，内有一组Rule
      // @ts-ignore
      const rules = this[key];
      const ruleField = new RuleField(rules);
      // 别名替换
      // @ts-ignore
      key = alias[key] ? alias[key] : key;
      const param = this._findParam(key);

      result = ruleField.validate(param.value);

      if (result.pass) {
        // 如果参数路径不存在，往往是因为用户传了空值，而又设置了默认值
        if (param.path.length === 0) {
          set(this.parsed, ['default', key], result.legalValue);
        } else {
          set(this.parsed, param.path, result.legalValue);
        }
      }
    }
    if (!result.pass) {
      const msg = `${isCustomFunc ? '' : key}${result.msg}`;
      return {
        msg: msg,
        success: false
      };
    }
    return {
      msg: 'ok',
      success: true
    };
  }

  _findParam(key: string) {
    let value;
    value = get(this.data, ['query', key]);
    if (value) {
      return {
        value,
        path: ['query', key]
      };
    }
    value = get(this.data, ['body', key]);
    if (value) {
      return {
        value,
        path: ['body', key]
      };
    }
    value = get(this.data, ['path', key]);
    if (value) {
      return {
        value,
        path: ['path', key]
      };
    }
    value = get(this.data, ['header', key]);
    if (value) {
      return {
        value,
        path: ['header', key]
      };
    }
    return {
      value: null,
      path: []
    };
  }
}

class RuleResult {
  pass: any;
  msg: any;
  constructor(pass: any, msg = '') {
    Object.assign(this, {
      pass,
      msg
    });
  }
}

class RuleFieldResult extends RuleResult {
  legalValue(parsed: any, arg1: string[], legalValue: any) {
    throw new Error('Method not implemented.');
  }
  pass: any;
  constructor(pass: any, msg = '', legalValue = null) {
    super(pass, msg);
    // @ts-ignore
    this.legalValue = legalValue;
  }
}

class Rule {
  name: any;
  params: any;
  msg: any;
  message: any;
  constructor(name: any, msg: any, ...params: any) {
    Object.assign(this, {
      name,
      msg,
      params
    });
  }

  validate(field: any) {
    if (this.name === 'isOptional') return new RuleResult(true);
    // @ts-ignore
    if (!validator[this.name](field + '', ...this.params)) {
      return new RuleResult(false, this.msg || this.message || '参数错误');
    }
    return new RuleResult(true, '');
  }
}

class RuleField {
  rules: any;
  constructor(rules: any) {
    this.rules = rules;
  }

  validate(field: any) {
    if (field == null) {
      // 如果字段为空
      const allowEmpty = this._allowEmpty();
      const defaultValue = this._hasDefault();
      if (allowEmpty) {
        return new RuleFieldResult(true, '', defaultValue);
      } else {
        return new RuleFieldResult(false, '字段是必填参数');
      }
    }

    const filedResult = new RuleFieldResult(false);
    for (let rule of this.rules) {
      let result = rule.validate(field);
      if (!result.pass) {
        filedResult.msg = result.msg;
        // @ts-ignore
        filedResult.legalValue = null;
        // 一旦一条校验规则不通过，则立即终止这个字段的验证
        return filedResult;
      }
    }
    return new RuleFieldResult(true, '', this._convert(field));
  }

  _convert(value: any) {
    for (let rule of this.rules) {
      if (rule.name === 'isInt') {
        return parseInt(value);
      }
      if (rule.name === 'isFloat') {
        return parseFloat(value);
      }
      if (rule.name === 'isBoolean') {
        return Boolean(value);
      }
    }
    return value;
  }

  _allowEmpty() {
    for (let rule of this.rules) {
      if (rule.name === 'isOptional') {
        return true;
      }
    }
    return false;
  }

  _hasDefault() {
    for (let rule of this.rules) {
      const defaultValue = rule.params[0];
      if (rule.name === 'isOptional') {
        return defaultValue;
      }
    }
  }
}

export { Rule, LinValidator };
