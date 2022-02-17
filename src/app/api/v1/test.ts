import { Prefix, Get, Post } from '../../../core/route';
import Koa from 'koa';
import UnifyResponse from '../../../core/exception/unify-response';

@Prefix('v1')
export default class TestController {
  @Get('test')
  async test(ctx: Koa.Context, next: any) {
    UnifyResponse.updateSuccess(3);
  }

  @Get('test1')
  async test1(ctx: Koa.Context, next: any) {
    UnifyResponse.updateSuccess(2, '更新成功');
  }

  @Get('test2')
  async test2(ctx: Koa.Context, next: any) {
    UnifyResponse.parameterException(10006);
  }
}
