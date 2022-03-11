import Koa from 'koa'
import { redisGet, redisSet } from '../../../core/redis'
import {
  request,
  summary,
  path,
  tags,
  body,
  prefix
} from 'koa-swagger-decorator'

const tag = tags(['redis'])

const idSchema = {
  id: { type: 'number', required: true }
}

@prefix('/redis')
export default class RedisController {
  @request('get', '/user/{id}')
  @summary('Get a Value for Redis')
  @tag
  @path(idSchema)
  async getValue(ctx: Koa.Context, next: any) {
    const id = ctx.params.id + ''
    const res = await redisGet(id)
    ctx.body = res
  }

  @request('post', '/user')
  @summary('Set a key-value to Redis')
  @tag
  @body(idSchema)
  async setValue(ctx: Koa.Context, next: any) {
    const id = ctx.request.body.id
    await redisSet(id, `this user is ${id}`)
    global.UnifyResponse.createSuccess({})
  }
}
