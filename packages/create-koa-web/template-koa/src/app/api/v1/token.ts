import { Context } from 'koa'
import {
  request,
  summary,
  description,
  query,
  path,
  body,
  tags,
  prefix,
  security
} from 'koa-swagger-decorator'
import { LOGIN_TYPE } from '~/app/shared/enum'
import { TokenValidator } from '~/app/valid/token'
import { generateToken } from '~/core/auth'

const tag = tags(['token'])

const tokenSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: false },
  type: { type: 'number', required: true }
}

@prefix('/token')
export default class TokenController {
  @request('post', '')
  @summary('get token')
  @description('example: /token')
  @tag
  @body(tokenSchema)
  async getToken(ctx: Context) {
    const { parsed } = await new TokenValidator().validate(ctx)
    const type = parsed.body.type
    let token = ''
    switch (type) {
      case LOGIN_TYPE.USER_USERNAME:
        token = generateToken('0')
        break
      case LOGIN_TYPE.USER_WX:
        token = generateToken('1')
        break
      default:
        global.UnifyResponse.parameterException(10003)
        break
    }
    ctx.body = { token: token }
  }
}
