import type { Context } from 'koa'
import {
  body,
  description,
  path,
  prefix,
  query,
  request,
  security,
  summary,
  tags,
} from 'koa-swagger-decorator'
import * as userSerivce from '~/app/service/user'
import { generateToken } from '~/core/auth'

const tag = tags(['example'])

const userSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
}

@prefix('/example')
export default class ExampleController {
  @request('get', '/{id}/id')
  @summary('Get user by id')
  @description('example: /example/1/id')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async getUser(ctx: Context) {
    const { id } = ctx.validatedParams
    ctx.body = await userSerivce.getUserById(id)
  }

  @request('post', '/register')
  @summary('user register')
  @description('example: /example/register')
  @tag
  @body(userSchema)
  async register(ctx: Context) {
    const user = ctx.validatedBody
    ctx.body = await userSerivce.createUser(user)
  }

  @request('post', '/login')
  @summary('user login')
  @description('example: /example/login')
  @tag
  @body(userSchema)
  async login(ctx: Context) {
    const user = ctx.validatedBody
    const token = generateToken(user.username + user.password)
    global.UnifyResponse.createSuccess({ message: token })
  }

  @request('delete', '')
  @summary('delete user')
  @description('example: /example?id=1')
  @tag
  @query({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async query(ctx: Context) {
    const id = ctx.query.id as any
    await userSerivce.deleteById(id)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }
}
