/**
 * 必传参数不满足条件时提示文本
 * 这里只列举常用的校验格式提示，更多请参考 validator 工具https://github.com/validatorjs/validator.js
 */
export enum Validator {
  isBase64 = '参数必须为base64格式',
  isBoolean = '参数必须为boolean类型',
  isDate = '参数必须为时间格式',
  isEmail = '参数必须为邮箱格式',
  isFloat = '参数必须为浮点型',
  isInt = '参数必须为整型',
  isJSON = '参数必须为JSON格式',
  isJWT = '参数必须为JWT token格式',
  isLength = '参数必传',
  isString = '参数必须为字符串',
  isURL = '参数必须为URL格式'
}
