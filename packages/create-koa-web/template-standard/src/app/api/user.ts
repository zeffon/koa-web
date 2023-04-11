import type { Context } from 'koa'
import {
  body,
  description,
  path,
  prefix,
  query,
  request,
  security,
  summary,
  tags,
} from 'koa-swagger-decorator'
import { pagingSchema } from '~/app/dto/base'
import { passwordSchema, userSchema } from '~/app/dto/user'
import {
  createOne,
  curUser,
  deleteById,
  getById,
  getList,
  getPage,
  updateOne,
} from '~/app/service/user'
import auth, { authAll } from '~/core/auth'

const tag = tags(['user'])

@prefix('/user')
@authAll
export default class UserController {
  /**
   * @security([{ api_key: [] }])
   * In Swagger UI, it will be displayed as a lock icon that you can click to view and configure the required API key or OAuth2 token.
   * If your API does not require security measures, `@security` can be omitted.
   * @param ctx
   */
  @request('get', '/me')
  @summary('Get user')
  @description('example: /user/me')
  @tag
  @security([{ api_key: [] }])
  @auth()
  async me(ctx: Context) {
    const user = await curUser(ctx)
    ctx.body = user
  }

  @request('get', '/list')
  @summary('Get user list')
  @description('example: /user/list')
  @tag
  @auth(false)
  async list(ctx: Context) {
    const list = await getList()
    ctx.body = { list }
  }

  @request('get', '/page')
  @summary('Get user page')
  @description('example: /user/page')
  @tag
  @query(pagingSchema)
  @auth(false)
  async page(ctx: Context) {
    const paging = await getPage(ctx)
    ctx.body = { paging }
  }

  @request('get', '/{id}/detail')
  @summary('Get user detail')
  @description('example: /user/1/detail')
  @tag
  @security([{ api_key: [] }])
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
  @security([{ api_key: [] }])
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
  @security([{ api_key: [] }])
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
  @security([{ api_key: [] }])
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  async delete(ctx: Context) {
    const { id } = ctx.validatedParams
    await deleteById(id)
    global.UnifyResponse.deleteSuccess({ code: global.SUCCESS_CODE })
  }
}
