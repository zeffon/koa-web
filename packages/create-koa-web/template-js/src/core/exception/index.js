import Logger from '../log/index.js'
import CODE from './exception-code.js'
import { HttpException, Success } from './http-exception.js'
import pkg from 'lodash'
const { isNumber } = pkg

const UNDEDINED_ERROR_TIP = 'undefined errorCode'

/**
 * Global exception catch
 */
export default async function catchError(ctx, next) {
  try {
    await next()
  } catch (error) {
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
        request
      }
      ctx.body = data
    } else if (error.status !== 500) {
      const data = {
        code: 10001,
        message: error.message || CODE.get(10001),
        request
      }
      ctx.body = data
      ctx.status = error.status || 500
    } else {
      const data = {
        code: 9999,
        message: CODE.get(9999),
        request
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
function logError(error, isHttpException) {
  let isSuccess = error instanceof Success
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
function getMessage(error) {
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
function getCode(error) {
  const code = isNumber(error.code) ? error.code : 10000
  return code
}
