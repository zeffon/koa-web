import { User } from '../model'
import { IUserModel } from '../model/user'

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

export const getAll = async () => {
  return await User.findAll()
}
