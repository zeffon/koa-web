interface RequiredConfig {
  method: string;
  path: string;
}

interface RequiredRoute {
  target: any;
  method: string;
  path: string;
}

interface OptionItem {
  label: string;
  value: string | number;
}

interface ValidatorOption {
  isLength: string;
  isString: string;
  isBoolean: string;
  isInt: string;
  isFloat: string;
  isEmail: string;
  [x: string]: any;
}

declare namespace NodeJS {
  interface Global {
    Validator: ValidatorOption;
    requestCount: number;
    requestStart: any;
    requestEnd: any;
  }
}
