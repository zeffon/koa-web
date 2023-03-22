import { DataTypes, Model } from 'sequelize'
import type { IBaseModel } from './base'
import sequelizeClient from '~/core/database'
import { format } from '~/core/tool'

export interface IUserModel extends IBaseModel {
  username: string
  password: string
}

export default class User extends Model<IUserModel, IUserModel> {
  declare id: number
  declare created_at: Date
  declare updated_at: Date
  declare deleted_at: Date
  declare username: string
  declare password: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      get() {
        return format(this.getDataValue('created_at')!)
      },
    },
    updated_at: {
      type: DataTypes.DATE,
      get() {
        return format(this.getDataValue('updated_at')!)
      },
    },
    deleted_at: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('deleted_at')
          ? format(this.getDataValue('deleted_at')!)
          : null
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'user',
    sequelize: sequelizeClient.config(),
    paranoid: true,
    underscored: true,
  },
)
