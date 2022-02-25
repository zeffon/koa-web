import Koa from 'koa';
import { redisGet, redisSet } from '../../../core/redis';
import {
  request,
  summary,
  path,
  tags,
  body,
  prefix
} from 'koa-swagger-decorator';

const tag = tags(['redis']);

const idSchema = {
  id: { type: 'number', required: true }
};

@prefix('/api/redis')
export default class RedisController {
  @request('get', '/user/{id}')
  @summary('Redis获取')
  @tag
  @path(idSchema)
  async getValue(ctx: Koa.Context, next: any) {
    const id = ctx.params.id + '';
    const res = await redisGet(id);
    ctx.body = res;
  }

  @request('post', '/user')
  @summary('Redis赋值')
  @tag
  @body(idSchema)
  async setValue(ctx: Koa.Context, next: any) {
    const id = ctx.request.body.id;
    await redisSet(id, `this user is ${id}`);
    global.UnifyResponse.createSuccess({});
  }
}
