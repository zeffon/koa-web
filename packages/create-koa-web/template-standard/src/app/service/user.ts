import type { Context } from 'koa'
import type { IUserModel } from '../model/user'
import { User } from '../model'
import { Paging } from '../dto/base'
import { decodeToken } from '~/core/auth'

export const createUser = async (user: IUserModel): Promise<User> => {
  const hadUser = await User.findOne({ where: { username: user.username } })
  if (hadUser) {
    global.UnifyResponse.parameterException(20003)
  }
  return await User.create(user)
}

export const updateUser = async (user: IUserModel): Promise<User> => {
  const oldUser = await User.findByPk(user.id)
  if (!oldUser) {
    global.UnifyResponse.notFoundException(10020)
  }
  return await oldUser!.update(user)
}

export const getUserById = async (id: number): Promise<User> => {
  const user = await User.findByPk(id)
  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const getUserByUsername = async (username: string): Promise<User> => {
  const user = await User.findOne({ where: { username } })
  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeleted = await User.destroy({ where: { id } })
  return !!numDeleted
}

export const getList = async (): Promise<User[]> => {
  return await User.findAll()
}

export const getPage = async (ctx: Context): Promise<Paging<User>> => {
  const { start, limit } = ctx.validatedQuery
  const offset = (start - 1) * limit
  const pageRel = await User.findAll({ offset, limit })
  const totalRel = (await User.findAll()).length

  return new Paging(pageRel, totalRel, start, limit)
}

export const curUser = async (ctx: Context): Promise<User> => {
  const bearerToken = ctx.header.authorization
  const token = bearerToken!.split(' ')[1]
  const userId = decodeToken(token!)
  const user = await getUserById(userId)
  return user
}
