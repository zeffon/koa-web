import { User } from '../model'
import type { IUserModel } from '../model/user'

export const create = async (user: IUserModel) => {
  return await User.create(user)
}

export const getById = async (id: number) => {
  return await User.findByPk(id)
}

export const getByOpenid = async (openid: string) => {
  return await User.findOne({ where: { openid } })
}

export const getByUsername = async (username: string) => {
  return await User.findOne({ where: { username } })
}

export const deleteById = async (id: number) => {
  const numDeleted = await User.destroy({ where: { id } })
  return !!numDeleted
}

export const list = async () => {
  return await User.findAll()
}

export const page = async (page: number, limit: number) => {
  const offset = (page - 1) * limit
  return await User.findAll({ offset, limit })
}
