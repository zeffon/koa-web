import { Prefix, Get, Post } from '../../../core/route';
import Koa from 'koa';
import UnifyResponse from '../../../core/exception/unify-response';

@Prefix('v1')
export default class TestController {
  @Get('test')
  async test(ctx: Koa.Context, next: any) {
    UnifyResponse.parameterException('自定义措辞有');
  }

  @Get('test1')
  async test1(ctx: Koa.Context, next: any) {
    UnifyResponse.parameterException(10003);
  }

  @Get('test2')
  async test2(ctx: Koa.Context, next: any) {
    UnifyResponse.parameterException(10006);
  }
}
