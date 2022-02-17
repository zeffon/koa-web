import Koa from 'koa';
import { isNumber } from 'lodash';
import CODE from './exception-code';
import { HttpException } from './http-exception';

const UNDEDINED_ERROR_TIP = '未定义的错误码';

/**
 * 全局异常捕获
 */
export default async function catchError(ctx: Koa.Context, next: any) {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    const request = `${ctx.request.method} ${ctx.request.originalUrl}`;
    logError(error, isHttpException);

    if (isHttpException) {
      const message = isNumber(error.code)
        ? error.message || CODE.get(error.code) || UNDEDINED_ERROR_TIP
        : error.code;
      const code = isNumber(error.code) ? error.code : 10000;
      ctx.status = error.status;
      const data = {
        code,
        message,
        request
      };
      ctx.body = data;
    } else {
      const data = {
        code: 9999,
        message: CODE.get(9999),
        request
      };
      ctx.body = data;
      ctx.status = 500;
    }
  }
}

function logError(error: any, isHttpException: boolean) {
  // TODO
}
