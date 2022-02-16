import { isArray, isPlainObject } from 'lodash';

/**
 * 返回路径
 **/
export function toPath(...arg: string[]) {
  let getPath = (path: string) => {
    if (!path) return '';
    if (!path.startsWith('/')) path = '/' + path;
    if (path.endsWith('/')) path = path.substring(0, path.length - 1);
    return path;
  };
  return arg.map((item) => getPath(item)).join('');
}

/**
 * 确认返回数组
 **/
export function sureIsArray(arr: any): any[] {
  return Array.isArray(arr) ? arr : [arr];
}

/**
 * 对象转字符串
 **/
export function objectToJson(val: any) {
  if (isArray(val) || isPlainObject(val)) return JSON.stringify(val);
  return val.toString();
}

/**
 * 字符串转对象
 **/
export function jsonToObject(val: any) {
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}

export function objectMapToArray(map: Map<string | number, string>) {
  const array: OptionItem[] = [];
  for (const [key, value] of map.entries()) {
    array.push({
      label: value,
      value: key
    });
  }
}
