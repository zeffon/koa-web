import jwt, { JwtPayload } from 'jsonwebtoken'
import { Context } from 'koa'
import CONFIG from '~/config'

export function generateToken(userId: number) {
  const token = jwt.sign({ userId }, CONFIG.SECRET.JWT_KEY, {
    expiresIn: CONFIG.SECRET.EXPIRES_IN
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
      complete: true
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

const auth = (
  target: any,
  property: string,
  descriptor: PropertyDescriptor
) => {
  const oldValue = descriptor.value
  descriptor.value = function () {
    const ctx = arguments[0]
    const authorization = ctx.header.authorization
    _verifyBearerToken(authorization)
    return oldValue.apply(null, arguments)
  }
  return descriptor
}

export default auth

export const authMiddleware = async (ctx: Context, next: any) => {
  _verifyBearerToken(ctx.header.authorization)
  await next()
}
