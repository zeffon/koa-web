import jwt, { JwtPayload } from 'jsonwebtoken'
import { Context } from 'koa'
import CONFIG from '~/config'
import cacheClient from '../cache'

const CUR_REQUEST_METHOD = 'CUR_REQUEST_METHOD'

export function generateToken(userId: number) {
  const token = jwt.sign({ userId }, CONFIG.SECRET.JWT_KEY, {
    expiresIn: CONFIG.SECRET.EXPIRES_IN,
  })
  return token
}

export function decodeToken(token: string) {
  const { payload } = jwt.decode(token, { complete: true })! as JwtPayload
  const userId = payload.userId
  return userId
}

export function verifyToken(token: string) {
  try {
    jwt.verify(token, CONFIG.SECRET.JWT_KEY, {
      complete: true,
    })
  } catch (error) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }
}

function _verifyBearerToken(bearerToken: string | undefined) {
  if (!bearerToken) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }

  const tokens = bearerToken?.split(' ') as string[]
  if (!(tokens?.length === 2)) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }
  if (tokens[0] !== 'Bearer') {
    global.UnifyResponse.unAuthenticatedException(10004)
  }

  verifyToken(tokens[1])
}

export const authMiddleware =
  (target: any) => async (ctx: Context, next: any) => {
    await next()
    const methods = Object.getOwnPropertyNames(target.prototype)
    const methodNames: string[] = []
    methods.forEach((name) => {
      const key = `${target.name}-${name}`
      methodNames.push(key)
    })
    const curMethod = cacheClient.get<{ key: string; disabled: boolean }>(
      CUR_REQUEST_METHOD,
    )
    if (
      !curMethod ||
      (methodNames.includes(curMethod.key) && curMethod.disabled)
    ) {
      _verifyBearerToken(ctx.header.authorization)
    }
    cacheClient.delete(CUR_REQUEST_METHOD)
  }

export const authAll = (target: any) => {
  const middlewares = [authMiddleware(target)]
  target.middlewares = middlewares
}

const auth =
  (disabled = true) =>
  (target: any, property: string, descriptor: PropertyDescriptor) => {
    const oldValue = descriptor.value
    descriptor.value = function () {
      if (!target.prototype && target.constructor) {
        target = target.constructor
      }
      const key = `${target.name}-${property}`
      cacheClient.set(CUR_REQUEST_METHOD, { key, disabled })
      if (disabled) {
        const ctx = arguments[0]
        const authorization = ctx.header.authorization
        _verifyBearerToken(authorization)
      }
      return oldValue.apply(null, arguments)
    }
    return descriptor
  }

export default auth
