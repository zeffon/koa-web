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
  constructor(one: User) {
    super(one)
    this.id = one.getDataValue('id')
    this.username = one.getDataValue('username')
    this.created_at = one.getDataValue('created_at')
    this.updated_at = one.getDataValue('updated_at')
  }
}
