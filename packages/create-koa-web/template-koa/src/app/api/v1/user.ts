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
import { getUserById } from '~/app/service/user'
import { decodeToken } from '~/core/auth'

const tag = tags(['user'])

@prefix('/user')
export default class TokenController {
  @request('get', '/me')
  @summary('Get user')
  @description('example: /user/me')
  @tag
  @security([{ api_key: [] }])
  async me(ctx: Context) {
    const bearerToken = ctx.header.authorization
    const token = bearerToken!.split(' ')[1]
    const userId = decodeToken(token!)
    const user = await getUserById(userId)
    ctx.body = user
  }

  @request('get', '/list')
  @summary('Get user list')
  @description('example: /user/list')
  @tag
  @security([{ api_key: [] }])
  async list(ctx: Context) {
    const id = ctx.params.id
  }

  @request('get', '/{id}')
  @summary('Get user detail')
  @description('example: /user/1')
  @tag
  @security([{ api_key: [] }])
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  async detail(ctx: Context) {
    const id = ctx.params.id
  }

  @request('post', '')
  @summary('create user')
  @description('example: /user')
  @tag
  @security([{ api_key: [] }])
  async create(ctx: Context) {
    const id = ctx.params.id
  }

  @request('put', '')
  @summary('modify user')
  @description('example: /user')
  @tag
  @security([{ api_key: [] }])
  async update(ctx: Context) {
    const id = ctx.params.id
  }

  @request('delete', '')
  @summary('delete user')
  @description('example: /user')
  @tag
  @security([{ api_key: [] }])
  async delete(ctx: Context) {
    const id = ctx.params.id
  }
}
