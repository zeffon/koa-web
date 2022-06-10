import { DataTypes, Model } from 'sequelize'
import sequelizeClient from '~/core/database'

export interface IUserModel {
  id: number
  username: string
  password: string
  openid: string
}

export type CUserModel = Omit<IUserModel, 'id'>

export default class User
  extends Model<IUserModel, IUserModel>
  implements IUserModel
{
  public id!: number
  public username!: string
  public password!: string
  public openid!: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'user',
    sequelize: sequelizeClient.config(),
    paranoid: true,
    underscored: true
  }
)
