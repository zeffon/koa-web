import { Rule, LinValidator } from './validator'
import _ from 'lodash'
import ValidTip from './valid-tip'

/**
 * The parameter from Schema Object
 * {key: {rules: [{ type: 'email', message: 'Please enter email format' }, ...]}}
 */
interface ItemRule {
  key: string
  rules: Rule[]
}
class ParamValidator extends LinValidator {
  [x: string]: any

  constructor(schema: Schema) {
    super()
    const rules = this._getRules(schema)
    rules.forEach((item) => {
      this[item.key] = item.rules
    })
  }

  _getRules(schema: Schema) {
    const arrayRule: ItemRule[] = []
    for (const key in schema) {
      const schemaItem = schema[key]
      const optionalRule = this._isOptionalRule(schemaItem.required)
      const otherRules = this._otherRules(schemaItem.rules)
      const rules = [...optionalRule, ...otherRules]
      arrayRule.push({ key, rules })
    }
    return arrayRule
  }

  _isOptionalRule(required: boolean): Rule[] {
    return !required ? [new Rule('isOptional')] : []
  }

  _otherRules(rules: SchemaRule[] | undefined): Rule[] {
    if (!rules) {
      return []
    }
    const otherRules: Rule[] = []
    rules.forEach((item) => {
      let rule
      const type = item.type
      if (type === 'isLength' || type === 'isInt') {
        rule = this._calcLengthRule(item)
      } else if (type === 'matches' || type === 'equals') {
        rule = this._calcMatchesRule(item)
      } else if (type === 'function') {
        // TODO
        rule = this._calcMatchesRule(item)
      } else {
        rule = this._calcUniRule(item)
      }
      otherRules.push(rule)
    })
    return otherRules
  }

  _calcLengthRule(item: SchemaRule) {
    const message = this._getMessage(item.type, item.message)
    return new Rule(item.type, message, { min: item.min, max: item.max })
  }

  _calcMatchesRule(item: SchemaRule) {
    const message = this._getMessage(item.type, item.message)
    return new Rule(item.type, message, item.pattern)
  }

  _calcUniRule(item: SchemaRule) {
    const message = this._getMessage(item.type, item.message)
    return new Rule(item.type, message)
  }

  _getMessage(name: string, message: string | undefined) {
    return message ? message : ValidTip.get(name)
  }
}

export { ParamValidator, Rule }
