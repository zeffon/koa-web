import { User } from '../model'

export class UserVO extends User {
  constructor(user: User) {
    super(user)
    this.id = user.getDataValue('id')
    this.username = user.getDataValue('username')
    this.openid = user.getDataValue('openid')
    this.createdAt = user.getDataValue('createdAt')
    this.updatedAt = user.getDataValue('updatedAt')
  }
}
