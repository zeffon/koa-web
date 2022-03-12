interface OptionItem {
  label: string
  value: string | number
}

interface MembersOptions {
  prefix?: any
  specifiedType?: any
  filter?: any
}

type SchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array'

// more check it: https://github.com/validatorjs/validator.js
type RuleType =
  | 'isEmpty'
  | 'isLength'
  | 'isDate'
  | 'isEmail'
  | 'isBase64'
  | 'function'
  | 'isJSON'
  | 'isJWT'
  | 'isURL'
  | 'equals'
  | 'matches'
  | 'isLowercase'
  | 'isInt'

interface SchemaProperty {
  type: SchemaType
}

interface SchemaItem {
  type: SchemaType
  example: string
}

interface SchemaRule {
  type: RuleType
  message?: string
  min?: number
  max?: number
  pattern?: string
  validator?: Function
}

interface SchemaModel {
  type: SchemaType
  required: boolean
  items?: SchemaItem
  properties?: SchemaProperty
  rules?: SchemaRule[]
}

interface Schema {
  [name: string]: SchemaModel
}
