import { Prefix, Get, Post, Required } from '../../../core/route';
import Koa from 'koa';
import UnifyResponse from '../../../core/exception/unify-response';

@Prefix('v1')
export default class TestController {
  @Get('test')
  async hello(ctx: Koa.Context, next: any) {
    ctx.body = 'Hello World';
  }

  @Get('number')
  async numberValid(ctx: Koa.Context, next: any) {
    UnifyResponse.updateSuccess(3);
  }

  @Get('string')
  async stringValid(ctx: Koa.Context, next: any) {
    UnifyResponse.updateSuccess(2, '更新成功');
  }

  @Get('test1')
  @Required(['id'])
  async test2(ctx: Koa.Context, next: any) {
    // UnifyResponse.parameterException(10006);
    UnifyResponse.updateSuccess(2, '更新成功');
  }
}
