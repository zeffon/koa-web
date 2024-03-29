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
import { passwordSchema, userSchema } from '~/app/dto/user'

const tag = tags(['user'])

@prefix('/user')
export default class UserController {
  @request('get', '/list')
  @summary('Get user list')
  @description('example: /user/list')
  @tag
  async list(ctx: Context) {
    // get list of user
    ctx.body = [1, 2, 3]
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
    // get detail of user by id
    ctx.body = { id }
  }

  @request('post', '')
  @summary('create user')
  @description('example: /user')
  @tag
  @body(userSchema)
  async create(ctx: Context) {
    const user = ctx.validatedBody
    // create user
    global.UnifyResponse.createSuccess({ code: global.SUCCESS_CODE })
  }

  @request('put', '')
  @summary('modify user')
  @description('example: /user')
  @tag
  @body(passwordSchema)
  async update(ctx: Context) {
    const user = ctx.validatedBody
    // update user by id
    global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE })
  }

  /**
   * @security([{ api_key: [] }])
   * In Swagger UI, it will be displayed as a lock icon that you can click to view and configure the required API key or OAuth2 token.
   * If your API does not require security measures, `@security` can be omitted.
   * @param ctx
   */
  @request('delete', '')
  @summary('delete user')
  @description('example: /user?id=1')
  @tag
  @security([{ api_key: [] }])
  @query({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  async delete(ctx: Context) {
    const { id } = ctx.validatedParams
    const authorization = ctx.headers.authorization
    console.log(authorization)
    // delete user by id
    global.UnifyResponse.deleteSuccess({ code: global.SUCCESS_CODE })
  }
}
