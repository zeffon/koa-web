import type { Context } from 'koa'
import {
  body,
  description,
  path,
  prefix,
  query,
  request,
  summary,
  tags,
} from 'koa-swagger-decorator'
import { pagingSchema } from '~/app/dto/base'
import { passwordSchema, userSchema } from '~/app/dto/user'
import {
  createOne,
  deleteById,
  getById,
  getList,
  getPage,
  updateOne,
} from '~/app/service/user'

const tag = tags(['user'])

@prefix('/user')
export default class UserController {
  @request('get', '/list')
  @summary('Get user list')
  @description('example: /user/list')
  @tag
  async list(ctx: Context) {
    const list = await getList()
    ctx.body = { list }
  }

  @request('get', '/page')
  @summary('Get user page')
  @description('example: /user/page')
  @tag
  @query(pagingSchema)
  async page(ctx: Context) {
    const paging = await getPage(ctx)
    ctx.body = { paging }
  }

  @request('get', '/{id}/detail')
  @summary('Get user detail')
  @description('example: /user/1/detail')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  async detail(ctx: Context) {
    const { id } = ctx.validatedParams
    const user = await getById(id)
    ctx.body = user
  }

  @request('post', '')
  @summary('create user')
  @description('example: /user')
  @tag
  @body(userSchema)
  async create(ctx: Context) {
    const user = ctx.validatedBody
    await createOne(user)
    global.UnifyResponse.createSuccess({ code: global.SUCCESS_CODE })
  }

  @request('put', '')
  @summary('modify user')
  @description('example: /user')
  @tag
  @body(passwordSchema)
  async update(ctx: Context) {
    const user = ctx.validatedBody
    await updateOne(user)
    global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE })
  }

  @request('delete', '/{id}')
  @summary('delete user')
  @description('example: /user/1')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  async delete(ctx: Context) {
    const { id } = ctx.validatedParams
    await deleteById(id)
    global.UnifyResponse.deleteSuccess({ code: global.SUCCESS_CODE })
  }
}
