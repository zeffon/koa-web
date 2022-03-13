import { Rule, LinValidator } from '../../core/validator'

/**
 * Register Validator
 */
export class RegisterValidator extends LinValidator {
  private email
  private nickname
  private password1
  private password2
  constructor() {
    super()
    this.email = [
      new Rule('isLength', 'Min 12 characters, max 32 characters', {
        min: 6,
        max: 32
      }),
      new Rule('isEmail', 'Please enter email format')
    ]
    this.password1 = [
      new Rule('isLength', 'Password has min 6 characters, max 32 characters', {
        min: 6,
        max: 32
      }),
      new Rule(
        'matches',
        'Password does not meet specifications',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', 'Nickname does not match the length', {
        min: 4,
        max: 32
      })
    ]
  }

  validatePassword(vals: any) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('Both passwords must be the same')
    }
  }
}
