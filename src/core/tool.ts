import { isArray, isPlainObject } from 'lodash-es';

export function toPath(...arg: string[]) {
  let getPath = (path: string) => {
    if (!path) return '';
    if (!path.startsWith('/')) path = '/' + path;
    if (path.endsWith('/')) path = path.substring(0, path.length - 1);
    return path;
  };
  return arg.map((item) => getPath(item)).join('');
}

export function sureIsArray(arr: any): any[] {
  return Array.isArray(arr) ? arr : [arr];
}

// 处理数据 JSON 格式字符串
export function objectToJson(val: any) {
  if (isArray(val) || isPlainObject(val)) return JSON.stringify(val);
  return val.toString();
}

// 格式化 字符串
export function jsonToObject(val: any) {
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}
