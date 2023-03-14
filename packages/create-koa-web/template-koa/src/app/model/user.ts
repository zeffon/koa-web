import { DataTypes, Model } from 'sequelize'
import type { IBaseModel } from './base'
import sequelizeClient from '~/core/database'
import { format } from '~/core/tool'

export interface IUserModel extends IBaseModel {
  username: string
  password: string
  openid: string
}

export type CUserModel = Omit<IUserModel, 'id'>

export default class User extends Model<IUserModel, IUserModel> {
  declare id: number
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date
  declare username: string
  declare password: string
  declare openid: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      get() {
        return format(this.getDataValue('createdAt')!)
      },
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      get() {
        return format(this.getDataValue('updatedAt')!)
      },
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('deletedAt')
          ? format(this.getDataValue('deletedAt')!)
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
    openid: {
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
