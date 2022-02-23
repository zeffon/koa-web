import {
  request,
  summary,
  description,
  tags,
  prefix,
  body
} from 'koa-swagger-decorator';
import Koa from 'koa';
import { RegisterValidator } from '../../valid/user';

const tag = tags(['test']);

const registerSchema = {
  email: { type: 'string', required: true },
  nickname: { type: 'string', required: true },
  password1: { type: 'string', required: true },
  password2: { type: 'string', required: true }
};

@prefix('/api/test')
export default class TestController {
  @request('get', '')
  @summary('应用连接测试')
  @description('测试系统是否连接成功, 同时验证单元测试')
  @tag
  static async testApp(ctx: Koa.Context) {
    ctx.body = 'Hello World!';
  }

  @request('post', '/register')
  @summary('注册')
  @description('校验器校验测试')
  @tag
  @body(registerSchema)
  static async register(ctx: Koa.Context) {
    const v = await new RegisterValidator().validate(ctx);
    const email = v.get('body.email');
    console.log(email);
    const user = {
      email: v.get('body.email'),
      nickname: v.get('body.nickname'),
      password: v.get('body.password2')
    };
    console.log(user);
    global.UnifyResponse.createSuccess();
  }
}
