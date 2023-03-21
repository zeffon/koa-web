import type { Context } from 'koa'
import {
  description,
  path,
  prefix,
  request,
  security,
  summary,
  tags,
} from 'koa-swagger-decorator'
import redisClient from '~/core/redis'
import cacheClient from '~/core/cache'

const tag = tags(['example'])

@prefix('/example')
export default class ExampleController {
  @request('get', '/{key}/redis')
  @summary('get redis')
  @description('example: /example/1/redis')
  @tag
  @path({
    key: { type: 'string', required: true, default: null, description: 'key' },
  })
  @security([{ api_key: [] }])
  async getRedis(ctx: Context) {
    const { key } = ctx.validatedParams
    let res = await redisClient.get<string>(key)
    if (!res) res = 'user no exists'
    global.UnifyResponse.deleteSuccess({ message: res })
  }

  @request('post', '/{key}/redis')
  @summary('set redis')
  @description('example: /example/1/redis')
  @tag
  @path({
    key: { type: 'string', required: true, default: null, description: 'key' },
  })
  @security([{ api_key: [] }])
  async setRedis(ctx: Context) {
    const { key } = ctx.validatedParams
    await redisClient.set(key, 'this is user: ' + key, 100)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }

  @request('delete', '/{key}/redis')
  @summary('set redis')
  @description('example: /example/1/redis')
  @tag
  @path({
    key: { type: 'string', required: true, default: null, description: 'key' },
  })
  @security([{ api_key: [] }])
  async delRedis(ctx: Context) {
    const { key } = ctx.validatedParams
    await redisClient.del(key)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }

  @request('get', '/{id}/cache')
  @summary('get cache')
  @description('example: /example/1/cache')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async getCache(ctx: Context) {
    const { id } = ctx.validatedParams
    let res = await cacheClient.get<string>(id)
    if (!res) res = 'user no exists'
    global.UnifyResponse.deleteSuccess({ message: res })
  }

  @request('post', '/{id}/cache')
  @summary('set cache')
  @description('example: /example/1/cache')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async setCache(ctx: Context) {
    const { id } = ctx.validatedParams
    await cacheClient.set(id, 'this is user: ' + id)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }

  @request('delete', '/{id}/cache')
  @summary('set cache1')
  @description('example: /example/1/cache')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async delCache(ctx: Context) {
    const { id } = ctx.validatedParams
    await cacheClient.del(id)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }
}
