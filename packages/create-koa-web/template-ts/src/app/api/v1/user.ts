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
import * as userSerivce from '../../service/user'
import { generateToken } from '../../../core/auth'

const tag = tags(['user'])

const userSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true }
}

@prefix('/user')
export default class UserController {
  @request('get', '/{id}/id')
  @summary('Get user by id')
  @description('example: /user/1/id')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async getUser(ctx: Context) {
    const id = ctx.params.id
    ctx.body = await userSerivce.getUserById(id)
  }

  @request('post', '/register')
  @summary('user register')
  @description('example: /user/register')
  @tag
  @body(userSchema)
  async register(ctx: Context) {
    const user = ctx.request.body
    ctx.body = await userSerivce.createUser(user)
  }

  @request('post', '/login')
  @summary('user login')
  @description('example: /user/login')
  @tag
  @body(userSchema)
  async login(ctx: Context) {
    const user = ctx.request.body
    const token = generateToken(user.username + user.password)
    global.UnifyResponse.createSuccess({ message: token })
  }

  @request('delete', '')
  @summary('delete user')
  @description('example: /user?id=1')
  @tag
  @query({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async query(ctx: Context) {
    const id = ctx.query.id as any
    await userSerivce.deleteById(id)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }
}
