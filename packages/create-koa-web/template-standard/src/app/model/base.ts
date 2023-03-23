import { DataTypes, Model } from 'sequelize'
import sequelizeClient from '~/core/database'
import { format } from '~/core/tool'

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
    get(this: any) {
      return format(this.getDataValue('created_at')!)
    },
  },
  updated_at: {
    type: DataTypes.DATE,
    get(this: any) {
      return format(this.getDataValue('updated_at')!)
    },
  },
  deleted_at: {
    type: DataTypes.DATE,
    get(this: any) {
      return this.getDataValue('deleted_at')
        ? format(this.getDataValue('deleted_at')!)
        : null
    },
  },
}
