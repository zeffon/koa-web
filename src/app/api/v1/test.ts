import { Prefix, Get, Post } from '../../../core/route';
import Koa from 'koa';

@Prefix('v1')
export default class TestController {
  @Get('test')
  async doUserRegister(ctx: Koa.Context, next: any) {
    ctx.body = { tip: 'this is test' };
  }
}
