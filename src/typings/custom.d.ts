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

interface MembersOptions {
  prefix?: any;
  specifiedType?: any;
  filter?: any;
}
