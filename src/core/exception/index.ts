import Koa from 'koa';
import CODE from './exception-code';
import { HttpException } from './http-exception';

/**
 * 全局异常捕获
 */
export async function catchError(ctx: Koa.Context, next: any) {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    const request = `${ctx.request.method} ${ctx.request.originalUrl}`;
    logError(error, isHttpException);

    if (isHttpException) {
      ctx.status = error.status;
      const data = {
        code: error.code,
        message: CODE.get(error.code) || '',
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
