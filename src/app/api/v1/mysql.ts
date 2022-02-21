import Koa from 'koa';
import { query } from '../../../core/mysql';
import { Prefix, Get, Post, Required } from '../../../core/route';

@Prefix('v1')
export default class TestMysql {
  //  参数形式 /v1/mysql?id=1
  @Get('mysql')
  @Required(['id'])
  async mysql(ctx: Koa.Context, next: any) {
    console.log(ctx.query);
    const id = ctx.query.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    const res = await query(sql);
    ctx.body = res;
  }

  //  参数形式 /v1/mysql/1
  @Get('mysql/:id')
  async mysql1(ctx: Koa.Context, next: any) {
    console.log(ctx.params);
    const id = ctx.params.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    const res = await query(sql);
    ctx.body = res;
  }

  //  参数形式 /v1/mysql  json: { id: 1 }
  @Post('mysql')
  async mysql2(ctx: Koa.Context, next: any) {
    console.log(ctx.request.body);
    const id = ctx.request.body.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    const res = await query(sql);
    ctx.body = res;
  }
}
