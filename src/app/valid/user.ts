import { Rule, LinValidator } from '../../core/validator/validator';

/**
 * 注册校验器
 */
export class RegisterValidator extends LinValidator {
  private email;
  private nickname;
  private password1;
  private password2;
  constructor() {
    super();
    this.email = [
      new Rule('isLength', '至少12个字符，最多32个字符', {
        min: 12,
        max: 32
      }),
      new Rule('isEmail', '不符合Email规范')
    ];
    this.password1 = [
      // 用户指定范围 123456 $^
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule(
        'matches',
        '密码不符合规范',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ];
  }

  validatePassword(vals: any) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同');
    }
  }
}
