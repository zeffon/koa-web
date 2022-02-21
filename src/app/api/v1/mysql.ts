import Koa from 'koa';
import { query } from '../../../core/mysql';
import { Prefix, Get, Post, Required } from '../../../core/route';

@Prefix('v1')
export default class TestMysql {
  @Get('mysql')
  @Required(['id'])
  async mysql(ctx: Koa.Context, next: any) {
    console.log(ctx.query);
    const id = ctx.query.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    const res = await query(sql);
    ctx.body = res;
  }
}
