import {
  request,
  summary,
  description,
  tags,
  prefix,
  body,
  query
} from 'koa-swagger-decorator';
import Koa from 'koa';
import { ParamValidator, Rule } from '../../../core/validator';
import { RegisterValidator } from '../../valid/user';

const tag = tags(['test']);

const registerSchema = {
  email: {
    type: 'string',
    required: true,
    rules: [
      new Rule('isLength', '至少12个字符，最多32个字符', {
        min: 12,
        max: 32
      }),
      new Rule('isEmail', '不符合Email规范')
    ]
  },
  nickname: {
    type: 'string',
    required: true,
    rules: [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ]
  },
  password1: { type: 'string', required: true, rules: [] },
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

  @request('get', '/register')
  @summary('注册')
  @description('自定义校验类进行校验方式')
  @tag
  @query(registerSchema)
  static async register(ctx: Koa.Context) {
    const v = await new RegisterValidator().validate(ctx);
    const user = {
      email: v.get('query.email'),
      nickname: v.get('query.nickname'),
      password: v.get('query.password2')
    };
    global.UnifyResponse.createSuccess({ message: '注册成功' });
  }

  @request('post', '/register2')
  @summary('注册')
  @description('配合Swagger的Schema进行校验')
  @tag
  @body(registerSchema)
  static async register2(ctx: Koa.Context) {
    const v = await new ParamValidator(registerSchema).validate(ctx);
    const email = v.get('body.email');
    console.log(email);
    const user = {
      email: v.get('body.email'),
      nickname: v.get('body.nickname'),
      password: v.get('body.password2')
    };
    console.log(user);
    global.UnifyResponse.createSuccess({ message: '注册成功' });
  }
}
