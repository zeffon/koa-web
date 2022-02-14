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
