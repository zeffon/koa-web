import { DataTypes, Model } from 'sequelize'
import sequelizeClient from '~/core/database'

export interface IBaseModel {
  id: number
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

export class BaseModel<T extends Object, C extends Object> extends Model<T, C> {
  declare id: number
  declare created_at: Date
  declare updated_at: Date
  declare deleted_at: Date
}

export const baseOptions = {
  sequelize: sequelizeClient.config(),
  paranoid: true,
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
}

export const baseFields = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
}
