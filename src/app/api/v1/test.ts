import { Prefix, Get, Post } from '../../../core/route';
import Koa from 'koa';
import UnifyResponse from '../../../core/exception/unify-response';

@Prefix('v1')
export default class TestController {
  @Get('test')
  async test(ctx: Koa.Context, next: any) {
    UnifyResponse.getSuccess(0);
  }

  @Get('test1')
  async test1(ctx: Koa.Context, next: any) {
    UnifyResponse.unAuthenticatedException(10005);
  }
}
