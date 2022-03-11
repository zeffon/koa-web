import {
  request,
  summary,
  description,
  tags,
  prefix,
  body,
  query
} from 'koa-swagger-decorator'
import Koa from 'koa'
import { ParamValidator, Rule } from '../../../core/validator'
import { RegisterValidator } from '../../valid/user'

const tag = tags(['test'])

const registerSchema = {
  email: {
    type: 'string',
    required: false,
    rules: [
      new Rule('isLength', 'Min 12 characters, max 32 characters', {
        min: 6,
        max: 32
      }),
      new Rule('isEmail', 'Please enter email format')
    ]
  },
  nickname: {
    type: 'string',
    required: false,
    rules: [
      new Rule('isLength', 'Min 12 characters, max 32 characters', {
        min: 6,
        max: 32
      })
    ]
  },
  password1: { type: 'string', required: true, rules: [] },
  password2: { type: 'string', required: true }
}

@prefix('/test')
export default class TestController {
  @request('get', '')
  @summary('test ping')
  @description(
    'Test whether the system is connected successfully, and verify the unit test'
  )
  @tag
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

  @request('post', '/register2')
  @summary('register2')
  @description("Validate with Swagger's Schema")
  @tag
  @body(registerSchema)
  static async register2(ctx: Koa.Context) {
    const v = await new ParamValidator(registerSchema).validate(ctx)
    const email = v.get('body.email')
    console.log(email)
    const user = {
      email: v.get('body.email'),
      nickname: v.get('body.nickname'),
      password: v.get('body.password2')
    }
    console.log(user)
    global.UnifyResponse.createSuccess({ message: 'register success' })
  }
}
