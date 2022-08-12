import { Context } from 'koa'
import {
  request,
  summary,
  description,
  query,
  path,
  body,
  tags,
  prefix,
  security
} from 'koa-swagger-decorator'
import { pagingSchema } from '~/app/dto/base'
import { passwordSchema, userSchema } from '~/app/dto/user'
import {
  getUserById,
  getList,
  getPage,
  deleteById,
  createUser,
  updateUser,
  curUser
} from '~/app/service/user'
import { CreateUserValidator, PasswordValidator } from '~/app/valid/user'
import { UserVO } from '~/app/vo/user'

const tag = tags(['user'])

@prefix('/user')
export default class TokenController {
  @request('get', '/me')
  @summary('Get user')
  @description('example: /user/me')
  @tag
  @security([{ api_key: [] }])
  async me(ctx: Context) {
    const user = await curUser(ctx)
    console.log(user)
    ctx.body = new UserVO(user)
  }

  @request('get', '/list')
  @summary('Get user list')
  @description('example: /user/list')
  @tag
  @security([{ api_key: [] }])
  async list(ctx: Context) {
    const list = await getList()
    ctx.body = { list }
  }

  @request('get', '/page')
  @summary('Get user page')
  @description('example: /user/page')
  @tag
  @security([{ api_key: [] }])
  @query(pagingSchema)
  async page(ctx: Context) {
    const page = ctx.query.page as any
    const count = ctx.query.count as any
    const paging = await getPage(page, count)
    ctx.body = { paging }
  }

  @request('get', '/{id}/detail')
  @summary('Get user detail')
  @description('example: /user/1')
  @tag
  @security([{ api_key: [] }])
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  async detail(ctx: Context) {
    const userId = ctx.params.id
    const user = await getUserById(userId)
    ctx.body = new UserVO(user)
  }

  @request('post', '')
  @summary('create user')
  @description('example: /user')
  @tag
  @security([{ api_key: [] }])
  @body(userSchema)
  async create(ctx: Context) {
    const { parsed } = await new CreateUserValidator().validate(ctx)
    const user = parsed.body
    await createUser(user)
    global.UnifyResponse.createSuccess({ code: global.SUCCESS_CODE })
  }

  @request('put', '')
  @summary('modify user')
  @description('example: /user')
  @tag
  @security([{ api_key: [] }])
  @body(passwordSchema)
  async update(ctx: Context) {
    const { parsed } = await new PasswordValidator().validate(ctx)
    const user = parsed.body
    await updateUser(user)
    global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE })
  }

  @request('delete', '/{id}')
  @summary('delete user')
  @description('example: /user')
  @tag
  @security([{ api_key: [] }])
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' }
  })
  async delete(ctx: Context) {
    const userId = ctx.params.id
    await deleteById(userId)
    global.UnifyResponse.deleteSuccess({ code: global.SUCCESS_CODE })
  }
}
