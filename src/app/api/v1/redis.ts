import Koa from 'koa';
import { redisGet, redisSet } from '../../../core/redis';
import { Prefix, Get, Required } from '../../../core/route';

@Prefix('redis')
export default class TestRedis {
  @Get('set')
  @Required(['id'])
  async setValue(ctx: Koa.Context, next: any) {
    const id = ctx.query.id + '';
    await redisSet(id, 'token');
  }

  @Get('get')
  @Required(['id'])
  async getValue(ctx: Koa.Context, next: any) {
    const id = ctx.query.id + '';
    const res = await redisGet(id);
    ctx.body = res;
  }
}
