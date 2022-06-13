import { Model } from 'sequelize/types'

export interface IBaseModel {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
