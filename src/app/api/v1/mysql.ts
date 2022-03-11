import Koa from 'koa'
import { loadBySql } from '../../../core/mysql'

import {
  request,
  summary,
  description,
  query,
  path,
  body,
  tags,
  prefix
} from 'koa-swagger-decorator'

const tag = tags(['mysql'])

const idSchema = {
  id: { type: 'number', required: true }
}

@prefix('/mysql')
export default class MysqlController {
  @request('get', '/user/{id}')
  @summary('URL param')
  @description('example: /mysql/user/1')
  @tag
  @path({
    id: { type: 'number', required: true, default: 1, description: 'id' }
  })
  async path(ctx: Koa.Context, next: any) {
    console.log(ctx.params)
    const id = ctx.params.id
    let sql = `SELECT * FROM user WHERE id = ${id}`
    const res = await loadBySql(sql)
    ctx.body = res
  }

  @request('get', '/user')
  @summary('query param')
  @description('example: /mysql/user?id=1')
  @tag
  @query(idSchema)
  async query(ctx: Koa.Context, next: any) {
    console.log(ctx.query)
    const id = ctx.query.id
    let sql = `SELECT * FROM user WHERE id = ${id}`
    const res = await loadBySql(sql)
    ctx.body = res
  }

  @request('post', '/user')
  @summary('body param')
  @description('example: /mysql/user  json: { id: 1 }')
  @tag
  @body(idSchema)
  async body(ctx: Koa.Context, next: any) {
    console.log(ctx.request.body)
    const id = ctx.request.body.id
    let sql = `SELECT * FROM user WHERE id = ${id}`
    const res = await loadBySql(sql)
    ctx.body = res
  }
}
