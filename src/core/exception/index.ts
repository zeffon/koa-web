import Koa from 'koa';
import { isNumber } from 'lodash';
import Logger from '../log';
import CODE from './exception-code';
import { HttpException, Success } from './http-exception';

const UNDEDINED_ERROR_TIP = '未定义的错误码';

/**
 * 全局异常捕获
 */
export default async function catchError(ctx: Koa.Context, next: any) {
  try {
    await next();
  } catch (error: any) {
    const isHttpException = error instanceof HttpException;
    const request = `${ctx.method} ${ctx.path}`;
    logError(error, isHttpException);

    if (isHttpException) {
      const message = getMessage(error);
      const code = getCode(error);
      ctx.status = error.status;
      const data = {
        code,
        message,
        request
      };
      ctx.body = data;
    } else if (error.status !== 500) {
      const data = {
        code: 10001,
        message: error.message || CODE.get(10001),
        request
      };
      ctx.body = data;
      ctx.status = error.status;
    } else {
      const data = {
        code: 9999,
        message: CODE.get(9999),
        request
      };
      ctx.body = data;
      ctx.status = error.status;
    }
  }
}

/**
 * 日志记录
 * @param error error
 * @param isHttpException 是否为自定义的异常
 */
function logError(error: any, isHttpException: boolean) {
  let isSuccess = error instanceof Success;
  if (isSuccess) return;
  if (isHttpException) {
    const code = `错误码: ${getCode(error)}`;
    const message = getMessage(error);
    Logger.error('自定义异常', code, message);
  } else {
    Logger.error('未知错误', error, '未知错误');
  }
}

/**
 * 获取自定义的异常message
 * @param error
 * @returns message
 */
function getMessage(error: any): string {
  const message = isNumber(error.code)
    ? error.message || CODE.get(error.code) || UNDEDINED_ERROR_TIP
    : error.code;
  return message;
}

/**
 * 获取自定义的错误码
 * @param error
 * @returns code
 */
function getCode(error: any): number {
  const code = isNumber(error.code) ? error.code : 10000;
  return code;
}
