import {
  request,
  summary,
  description,
  tags,
  prefix,
  body,
  query,
  security
} from 'koa-swagger-decorator'
import Koa from 'koa'
import { RegisterValidator } from '../../valid/user'
import { generateToken } from '../../../core/auth'

const tag = tags(['test'])

const registerSchema = {
  email: {
    type: 'string',
    required: true
  },
  nickname: {
    type: 'string',
    required: false,
    rules: []
  },
  password1: {
    type: 'string',
    required: true
  },
  password2: { type: 'string', required: true }
}

const loginSchema = {
  username: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  }
}

@prefix('/test')
export default class TestController {
  @request('get', '')
  @summary('test ping')
  @description(
    'Test whether the system is connected successfully, and verify the unit test'
  )
  @tag
  @security([{ api_key: [] }])
  static async testApp(ctx: Koa.Context) {
    ctx.body = 'Hello World!'
  }

  @request('get', '/register')
  @summary('register')
  @description('Custom validation class for validation')
  @tag
  @query(registerSchema)
  static async register(ctx: Koa.Context) {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
      email: v.get('query.email'),
      nickname: v.get('query.nickname'),
      password: v.get('query.password2')
    }
    global.UnifyResponse.createSuccess({ message: 'register success' })
  }

  @request('post', '/login')
  @summary('login')
  @description('user login to get token')
  @tag
  @body(loginSchema)
  static async login(ctx: Koa.Context) {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const token = generateToken(username + password)
    global.UnifyResponse.createSuccess({ message: token })
  }
}
