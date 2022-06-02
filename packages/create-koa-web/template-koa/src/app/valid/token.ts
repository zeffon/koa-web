import { Rule, LinValidator } from '~/core/validator'

/**
 * Token Validator
 */
export class TokenValidator extends LinValidator {
  private username
  private password
  private type
  constructor() {
    super()
    this.username = [
      new Rule('isLength', 'username can not be empty', {
        min: 0
      })
    ]
    this.password = [
      new Rule('isOptional'),
      new Rule('isLength', 'Password has min 6 characters, max 32 characters', {
        min: 6,
        max: 32
      })
    ]
    this.type = [new Rule('isInt', 'type can not be empty')]
  }
}
