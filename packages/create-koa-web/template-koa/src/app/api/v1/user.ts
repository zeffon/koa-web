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
import {
  getUserById,
  getAll,
  deleteById,
  createUser,
  updateUser
} from '~/app/service/user'
import { CreateUserValidator, PasswordValidator } from '~/app/valid/user'
import { decodeToken } from '~/core/auth'

const tag = tags(['user'])

const userSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true }
}
const passwordSchema = {
  id: { type: 'number', required: true },
  password: { type: 'string', required: true }
}
@prefix('/user')
export default class TokenController {
  @request('get', '/me')
  @summary('Get user')
  @description('example: /user/me')
  @tag
  @security([{ api_key: [] }])
  async me(ctx: Context) {
    const bearerToken = ctx.header.authorization
    const token = bearerToken!.split(' ')[1]
    const userId = decodeToken(token!)
    const user = await getUserById(userId)
    ctx.body = user
  }

  @request('get', '/list')
  @summary('Get user list')
  @description('example: /user/list')
  @tag
  @security([{ api_key: [] }])
  async list(ctx: Context) {
    const list = await getAll()
    ctx.body = { list }
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
    ctx.body = { user }
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
