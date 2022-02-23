import {
  request,
  summary,
  description,
  query,
  path,
  body,
  tags,
  prefix
} from 'koa-swagger-decorator';
import Koa from 'koa';

const tag = tags(['list']);

const getListSchema = {
  keyword: { type: 'string', required: true },
  status: { type: 'number', required: true }
};

@prefix('/api/list')
export default class ListController {
  @request('get', '/list')
  @summary('返回一个列表')
  @description('example of api')
  @tag
  @query(getListSchema)
  static async getTodoList(ctx: Koa.Context) {
    const data = ctx.request.query;
    if (data) {
      ctx.body = {
        code: 1,
        bean: {
          totalCount: 2,
          list: ['AHSO', 'SAHSO']
        },
        message: '成功'
      };
    } else {
      ctx.body = {
        code: -1,
        message: '参数错误'
      };
    }
  }
}
