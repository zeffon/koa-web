import type Koa from 'koa'
import Logger from '../log'
import { isNumber } from '../tool'
import CODE from './exception-code'
import { HttpException, Success } from './http-exception'

const UNDEDINED_ERROR_TIP = 'undefined errorCode'

/**
 * Global exception catch
 */
export default async function catchError(ctx: Koa.Context, next: any) {
  try {
    await next()
  } catch (error: any) {
    const isHttpException = error instanceof HttpException
    const request = `${ctx.method} ${ctx.path}`
    logError(error, isHttpException)

    if (isHttpException) {
      const message = getMessage(error)
      const code = getCode(error)
      ctx.status = error.status
      const data = {
        code,
        message,
        request,
      }
      ctx.body = data
    } else if (error.status !== 500) {
      const data = {
        code: 10000,
        message: error.message || CODE.get(10000),
        request,
      }
      ctx.body = data
      ctx.status = error.status || 500
    } else {
      const data = {
        code: 10500,
        message: CODE.get(10500),
        request,
      }
      ctx.body = data
      ctx.status = error.status || 500
    }
  }
}

/**
 * logging
 * @param error error
 * @param isHttpException isHttpException
 */
function logError(error: any, isHttpException: boolean) {
  const isSuccess = error instanceof Success
  if (isSuccess) return
  if (isHttpException) {
    const code = `ERROR_CODE: ${getCode(error)}`
    const message = getMessage(error)
    Logger.error('CUSTOM_EXCEPTION', code, message)
  } else {
    Logger.error('SERVER_ERROR', error, 'unknown mistake')
  }
}

/**
 * Get custom exception message
 * @param error
 * @returns message
 */
function getMessage(error: any): string {
  const message = isNumber(error.code)
    ? error.message || CODE.get(error.code) || UNDEDINED_ERROR_TIP
    : error.code
  return message
}

/**
 * Get custom error code
 * @param error
 * @returns code
 */
function getCode(error: any): number {
  const code = isNumber(error.code) ? error.code : 10000
  return code
}
