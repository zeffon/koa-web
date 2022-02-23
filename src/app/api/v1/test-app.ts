import {
  request,
  summary,
  description,
  tags,
  prefix
} from 'koa-swagger-decorator';
import Koa from 'koa';

const tag = tags(['test']);

@prefix('/api/test')
export default class ListController {
  @request('get', '')
  @summary('应用连接测试')
  @description('测试系统是否连接成功, 同时验证单元测试')
  @tag
  static async testApp(ctx: Koa.Context) {
    ctx.body = 'Hello World!';
  }
}
