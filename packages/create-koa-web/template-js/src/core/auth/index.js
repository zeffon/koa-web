import jwt from 'jsonwebtoken'
import CONFIG from '../../config'

let unlessPaths = [
  /^\/koa-web\/v1\/json\.html[\/#\?]?$/i,
  /^\/koa-web\/v1\/doc\.html[\/#\?]?$/i,
  /^\/koa-web\/v1\/test\/login[\/#\?]?$/i,
  /^\/koa-web\/v1\/test\/register[\/#\?]?$/i
]

export default async function auth(ctx, next) {
  if (!_isUnless(ctx.path)) {
    _verifyBearerToken(ctx.header.authorization)
  }
  await next()
}

export function generateToken(payload) {
  const token = jwt.sign({ payload }, CONFIG.SECRET.JWT_KEY, {
    expiresIn: CONFIG.SECRET.EXPIRES_IN
  })
  return token
}

export function verifyToken(token) {
  try {
    jwt.verify(token, CONFIG.SECRET.JWT_KEY, {
      complete: true
    })
  } catch (error) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }
}

function _verifyBearerToken(bearerToken) {
  if (!bearerToken) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }

  const tokens = bearerToken?.split(' ')
  if (!(tokens?.length === 2)) {
    global.UnifyResponse.unAuthenticatedException(10004)
  }
  if (tokens[0] !== 'Bearer') {
    global.UnifyResponse.unAuthenticatedException(10004)
  }

  const token = tokens[1]
  verifyToken(token)
}

function _isUnless(path) {
  let valid = false
  unlessPaths.forEach((unlessPath) => {
    if (unlessPath.test(path)) {
      valid = true
    }
  })
  return valid
}
