import { UnifyResponse } from '../core/exception/unify-response';

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
  var UnifyResponse: UnifyResponse;
}
