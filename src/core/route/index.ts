/**
 * 装饰器权重 Required > Get Post Put Delete > Convert
 */
import Koa from 'koa';
import { sureIsArray } from '../tool';
import { routePrefix, Route } from './route';
import { ValidatorParameters } from '../validator';

/**
 * 路由前缀
 * @params prefix 路由前缀
 */
export function Prefix(prefix: string) {
  return (target: any) => {
    target.prototype[routePrefix] = prefix;
  };
}

/**
 * 处理GET请求
 * @params path 路由路径
 */
export function Get(path: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    let config = {
      method: 'get',
      path
    };
    return router(target, name, descriptor, config);
  };
}

/**
 * 处理POST请求
 * @params path 路由路径
 */
export function Post(path: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    let config = {
      method: 'post',
      path
    };
    return router(target, name, descriptor, config);
  };
}

/**
 * 处理PUT请求
 * @params path 路由路径
 */
export function Put(path: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    let config = {
      method: 'put',
      path
    };
    return router(target, name, descriptor, config);
  };
}

/**
 * 处理DELEte请求
 * @params path 路由路径
 */
export function Delete(path: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    let config = {
      method: 'delete',
      path
    };
    return router(target, name, descriptor, config);
  };
}

/**
 * 处理ALL请求
 * @params path 路由路径
 */
export function All(path: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    let config = {
      method: 'all',
      path
    };
    return router(target, name, descriptor, config);
  };
}

/**
 * 校验必传参数
 * @params params 必传参数列表，如需指定类型，用 &+类型 拼接成字符串
 * 如 @Required(['id', 'age&isInt', 'type&isBoolean'])
 * @description 包含 params query path header 后面可通过 ctx.data[类型].XXX 获取参数 方法装饰器
 * 如 let age = ctx.data.query.age
 */
export function Required(params: any[] = []) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    target[name] = sureIsArray(target[name]);
    target[name].splice(0, 0, middleware);
    return descriptor;
    // 处理参数中间件
    async function middleware(ctx: Koa.Context, next: any) {
      let newParams = ValidatorRequiredParams(params);
      await new ValidatorParameters(newParams).validate(ctx);
      await next();
    }
  };
}

/**
 * 统一路由请求处理方法
 */
function router(
  target: any,
  name: string,
  descriptor: PropertyDescriptor,
  config: any
) {
  Route.__DecoratedRouters.set(
    {
      target: target,
      path: config.path,
      method: config.method
    },
    target[name]
  );
  target[name] = sureIsArray(target[name]);
  let i = target[name].length - 1 >= 1 ? 1 : 0;
  target[name].splice(i, 0, middleware);
  return descriptor;
  async function middleware(ctx: Koa.Context, next: any) {
    await next();
  }
}

/**
 * 处理校验参数
 */
function ValidatorRequiredParams(params: any[]) {
  return params.map((item: string) => {
    let i = item.indexOf('&'),
      key: string,
      rule: string;
    if (i !== -1) {
      key = item.substring(0, i);
      rule = item.substring(i + 1);
    } else {
      key = item;
      rule = 'isLength';
    }
    return {
      key,
      rules: [rule, global.Validator[rule] || '参数格式错误']
    };
  });
}
