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
import RedisClient from '../../../core/redis'
import CacheClient from '../../../core/cache'

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

  @request('get', '/{id}/redis')
  @summary('get redis')
  @description('example: /user/1/redis')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async getRedis(ctx: Context) {
    const id = ctx.params.id
    const res = (await RedisClient.get(id)) as any
    global.UnifyResponse.deleteSuccess({ message: res })
  }

  @request('post', '/{id}/redis')
  @summary('set redis')
  @description('example: /user/1/redis')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async setRedis(ctx: Context) {
    const id = ctx.params.id
    await RedisClient.set(id, 'this is user: ' + id, 10)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }

  @request('get', '/{id}/cache')
  @summary('get cache')
  @description('example: /user/1/cache')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async getCache(ctx: Context) {
    const id = ctx.params.id
    const res = (await CacheClient.get(id)) as any
    global.UnifyResponse.deleteSuccess({ message: res })
  }

  @request('post', '/{id}/cache')
  @summary('set cache')
  @description('example: /user/1/cache')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async setCache(ctx: Context) {
    const id = ctx.params.id
    CacheClient.set(id, 'this is user: ' + id)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }

  @request('delete', '/{id}/cache')
  @summary('set cache1')
  @description('example: /user/1/cache')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  @security([{ api_key: [] }])
  async delCache(ctx: Context) {
    const id = ctx.params.id
    CacheClient.delete(id)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }
}
