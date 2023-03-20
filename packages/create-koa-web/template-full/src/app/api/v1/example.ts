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
import RedisClient from '~/core/redis'
import CacheClient from '~/core/cache'

const tag = tags(['example'])

@prefix('/example')
export default class ExampleController {
  @request('get', '/{id}/redis')
  @summary('get redis')
  @description('example: /example/1/redis')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async getRedis(ctx: Context) {
    const { id } = ctx.validatedParams
    const res = (await RedisClient.get(id)) as any
    global.UnifyResponse.deleteSuccess({ message: res })
  }

  @request('post', '/{id}/redis')
  @summary('set redis')
  @description('example: /example/1/redis')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async setRedis(ctx: Context) {
    const { id } = ctx.validatedParams
    await RedisClient.set(id, 'this is user: ' + id, 10)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }

  @request('post', '/{id}/redis')
  @summary('set redis')
  @description('example: /example/1/redis')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  @security([{ api_key: [] }])
  async delRedis(ctx: Context) {
    const { id } = ctx.validatedParams
    await RedisClient.delete(id)
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
    const res = (await CacheClient.get(id)) as any
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
    CacheClient.set(id, 'this is user: ' + id)
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
    CacheClient.delete(id)
    global.UnifyResponse.deleteSuccess({ code: 0 })
  }
}
