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
import { code2Session, userLogin } from '~/app/service/token'
import { LOGIN_TYPE } from '~/app/shared/enum'
import { TokenValidator } from '~/app/valid/token'

const tag = tags(['token'])

export const tokenSchema = {
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
    const userData = parsed.body
    let token = ''
    switch (userData.type) {
      case LOGIN_TYPE.USER_USERNAME:
        token = await userLogin(userData)
        break
      case LOGIN_TYPE.USER_WX:
        token = await code2Session(userData)
        break
      default:
        global.UnifyResponse.parameterException(10003)
        break
    }
    ctx.body = { token: token }
  }
}
