/**
 * Define the validation rule prompt
 * more validator please check: https://github.com/validatorjs/validator.js
 */
export enum Validator {
  isBase64 = 'The parameter must be in base64 format',
  isBoolean = 'The parameter must be of type boolean',
  isDate = 'The parameter must be in Date format',
  isEmail = 'The parameter must be in Email format',
  isFloat = 'The parameter must be float',
  isInt = 'The parameter must be of type int',
  isJSON = 'The parameter must be of type json',
  isJWT = 'The parameter must be in JWT token format',
  isLength = 'The parameter length cannot be empty',
  isString = 'The parameter must be of type string',
  isURL = 'The parameter must be in URL format'
}
