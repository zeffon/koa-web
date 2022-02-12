interface RequiredConfig {
  method: string;
  path: string;
}

interface RequiredRoute {
  target: any;
  method: string;
  path: string;
}

declare namespace NodeJS {
  interface Global {}
}
