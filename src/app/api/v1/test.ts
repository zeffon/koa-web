import { Prefix, Get, Post } from '../../../core/route';
import Koa from 'koa';
import {
  NotFoundException,
  UnAuthenticatedException
} from '../../../core/exception/http-exception';

@Prefix('v1')
export default class TestController {
  @Get('test')
  async test(ctx: Koa.Context, next: any) {
    throw new NotFoundException(0);
  }

  @Get('test1')
  async test1(ctx: Koa.Context, next: any) {
    throw new UnAuthenticatedException(10005);
  }
}
