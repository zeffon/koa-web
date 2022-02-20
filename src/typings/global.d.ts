export {};

interface ValidatorOption {
  isLength: string;
  isString: string;
  isBoolean: string;
  isInt: string;
  isFloat: string;
  isEmail: string;
  [x: string]: any;
}

declare global {
  var Validator: ValidatorOption;
}
