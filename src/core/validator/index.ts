import { Context } from 'koa'
import validator from 'validator'
import { findMembers } from '../tool'
import { get, last, set, cloneDeep } from 'lodash'

class LinValidator {
  data: any = {}
  parsed: any = {}
  alias: any = {};
  [x: string]: any

  public async validate(ctx: Context, alias = {}) {
    this.alias = alias
    let params = this._assembleAllParams(ctx)
    this.data = cloneDeep(params)
    this.parsed = cloneDeep(params)

    const memberKeys = findMembers(this, {
      filter: this._findMembersFilter.bind(this)
    })

    const errorMsgs = []
    for (let key of memberKeys) {
      const result = await this._check(key, alias)
      if (!result.success) {
        errorMsgs.push(result.msg)
      }
    }
    if (errorMsgs.length !== 0) {
      global.UnifyResponse.parameterException(errorMsgs.join(', '))
    }
    ctx.v = this
    return this
  }

  public get(path: string, parsed = true) {
    if (parsed) {
      const value = get(this.parsed, path, null)
      if (value == null) {
        const keys = path.split('.')
        const key = last(keys)
        return get(this.parsed.default, key as any)
      }
      return value
    } else {
      return get(this.data, path)
    }
  }

  private _assembleAllParams(ctx: Context) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      path: ctx.params,
      header: ctx.request.header
    }
  }

  private _findMembersFilter(key: any) {
    if (/validate([A-Z])\w+/g.test(key)) {
      return true
    }
    // @ts-ignore
    if (this[key] instanceof Array) {
      // @ts-ignore
      this[key].forEach((value: any) => {
        const isRuleType = value instanceof Rule
        if (!isRuleType) {
          throw new Error('The validation array must all be of type Rule')
        }
      })
      return true
    }
    return false
  }

  private async _check(key: string, alias = {}) {
    // @ts-ignore
    const isCustomFunc = typeof this[key] === 'function'
    let result: any = {}
    if (isCustomFunc) {
      try {
        // @ts-ignore
        await this[key](this.data)
        // @ts-ignore
        result = new RuleResult(true)
      } catch (error: any) {
        // @ts-ignore
        result = new RuleResult(
          false,
          error.msg || error.message || 'parameters error'
        )
      }
    } else {
      // @ts-ignore
      const rules = this[key]
      const ruleField = new RuleField(<Rule[]>rules)
      // @ts-ignore
      key = alias[key] ? alias[key] : key
      const param = this._findParam(key)

      result = ruleField.validate(param.value)

      if (result.pass) {
        if (param.path.length === 0) {
          set(this.parsed, ['default', key], result.legalValue)
        } else {
          set(this.parsed, param.path, result.legalValue)
        }
      }
    }
    if (!result.pass) {
      const field = isCustomFunc ? '' : key
      const msg = `${result.msg}: '${field}', please check again!`
      return {
        msg: msg,
        success: false
      }
    }
    return {
      msg: 'ok',
      success: true
    }
  }

  private _findParam(key: string) {
    let value
    value = get(this.data, ['query', key])
    if (value) {
      return {
        value,
        path: ['query', key]
      }
    }
    value = get(this.data, ['body', key])
    if (value) {
      return {
        value,
        path: ['body', key]
      }
    }
    value = get(this.data, ['path', key])
    if (value) {
      return {
        value,
        path: ['path', key]
      }
    }
    value = get(this.data, ['header', key])
    if (value) {
      return {
        value,
        path: ['header', key]
      }
    }
    return {
      value: null,
      path: []
    }
  }
}

class RuleResult {
  pass: boolean = true
  msg: string = ''
  constructor(pass: boolean, msg = '') {
    Object.assign(this, {
      pass,
      msg
    })
  }
}

class RuleFieldResult extends RuleResult {
  legalValue(parsed: any, arg1: string[], legalValue: any) {
    throw new Error('Method not implemented.')
  }

  constructor(pass: boolean, msg = '', legalValue = null) {
    super(pass, msg)
    // @ts-ignore
    this.legalValue = legalValue
  }
}

class Rule {
  name: any
  params: any
  msg: any
  message: any
  constructor(name: any, msg?: string, ...params: any) {
    Object.assign(this, {
      name,
      msg,
      params
    })
  }

  validate(field: string) {
    if (this.name === 'isOptional') {
      return new RuleResult(true)
    }
    if (!(validator as any)[this.name](field + '', ...this.params)) {
      return new RuleResult(
        false,
        this.msg || this.message || 'parameters error'
      )
    }
    return new RuleResult(true, '')
  }
}

class RuleField {
  rules: any
  constructor(rules: Rule[]) {
    this.rules = rules
  }

  validate(field: any) {
    if (field == null) {
      const allowEmpty = this._allowEmpty()
      const defaultValue = this._hasDefault()
      if (allowEmpty) {
        return new RuleFieldResult(true, '', defaultValue)
      } else {
        return new RuleFieldResult(false, 'incorrect field')
      }
    }

    const filedResult = new RuleFieldResult(false)
    for (let rule of this.rules) {
      let result = rule.validate(field)
      if (!result.pass) {
        filedResult.msg = result.msg
        // @ts-ignore
        filedResult.legalValue = null
        return filedResult
      }
    }
    return new RuleFieldResult(true, '', this._convert(field))
  }

  _convert(value: any) {
    for (let rule of this.rules) {
      if (rule.name === 'isInt') {
        return parseInt(value)
      }
      if (rule.name === 'isFloat') {
        return parseFloat(value)
      }
      if (rule.name === 'isBoolean') {
        return Boolean(value)
      }
    }
    return value
  }

  _allowEmpty() {
    for (let rule of this.rules) {
      if (rule.name === 'isOptional') {
        return true
      }
    }
    return false
  }

  _hasDefault() {
    for (let rule of this.rules) {
      const defaultValue = rule.params[0]
      if (rule.name === 'isOptional') {
        return defaultValue
      }
    }
  }
}

export { Rule, LinValidator }
