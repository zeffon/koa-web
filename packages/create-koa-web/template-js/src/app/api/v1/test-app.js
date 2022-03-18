import {
  request,
  summary,
  description,
  tags,
  prefix,
  body,
  query
} from 'koa-swagger-decorator'
import { RegisterValidator } from '../../valid/user.js'

const tag = tags(['test'])

const registerSchema = {
  email: { type: 'string', required: true, format: 'email' },
  nickname: { type: 'string', required: true, minLength: 10 },
  password1: {
    type: 'string',
    required: true,
    pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
  },
  password2: {
    type: 'string',
    required: true,
    pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
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
  static async testApp(ctx) {
    ctx.body = 'Hello World!'
  }

  @request('get', '/register')
  @summary('register')
  @description('Custom validation class for validation')
  @tag
  @query(registerSchema)
  static async register(ctx) {
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
  static async register2(ctx) {
    // const v = await new RegisterValidator().validate(ctx)
    // const user = {
    //   email: v.get('body.email'),
    //   nickname: v.get('body.nickname'),
    //   password: v.get('body.password2')
    // }
    // console.log(user)
    global.UnifyResponse.createSuccess({ message: 'register success' })
  }
}
