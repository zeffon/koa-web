import Koa from 'koa';
import { loadBySql } from '../../../core/mysql';

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

const tag = tags(['mysql']);

const idSchema = {
  id: { type: 'number', required: true }
};

@prefix('/api/mysql')
export default class MysqlController {
  @request('get', '/user/{id}')
  @summary('URL上传参')
  @description('参数形式 /mysql/user/1')
  @tag
  @path({
    id: { type: 'number', required: true, default: 1, description: 'id' }
  })
  async path(ctx: Koa.Context, next: any) {
    console.log(ctx.params);
    const id = ctx.params.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    const res = await loadBySql(sql);
    ctx.body = res;
  }

  @request('get', '/user')
  @summary('param上传参')
  @description('参数形式 /mysql/user?id=1')
  @tag
  @query(idSchema)
  async query(ctx: Koa.Context, next: any) {
    console.log(ctx.query);
    const id = ctx.query.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    const res = await loadBySql(sql);
    ctx.body = res;
  }

  @request('post', '/user')
  @summary('body上传参')
  @description('参数形式 /mysql/user  json: { id: 1 }')
  @tag
  @body(idSchema)
  async body(ctx: Koa.Context, next: any) {
    console.log(ctx.request.body);
    const id = ctx.request.body.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    const res = await loadBySql(sql);
    ctx.body = res;
  }
}
