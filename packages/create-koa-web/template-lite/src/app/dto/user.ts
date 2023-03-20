import { User } from '../model'
export const userSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
}

export const passwordSchema = {
  id: { type: 'number', required: true },
  password: { type: 'string', required: true },
}

export class UserVO extends User {
  constructor(user: User) {
    super(user)
    this.id = user.getDataValue('id')
    this.username = user.getDataValue('username')
    this.openid = user.getDataValue('openid')
    this.created_at = user.getDataValue('created_at')
    this.updated_at = user.getDataValue('updated_at')
  }
}
