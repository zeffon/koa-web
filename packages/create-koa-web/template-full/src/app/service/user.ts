import type { Context } from 'koa'
import type { IUserModel } from '../model/user'
import { User } from '../model'
import type { Paging } from '../vo/paging'
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

export const getByOpenid = async (openid: string) => {
  return await User.findOne({ where: { openid } })
}

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeleted = await User.destroy({ where: { id } })
  return !!numDeleted
}

export const getList = async (): Promise<User[]> => {
  return await User.findAll()
}

export const getPage = async (
  page: number,
  count: number,
): Promise<Paging<User>> => {
  const offset = (page - 1) * count
  const userPage = await User.findAll({ offset, limit: count })
  const userTotal = (await User.findAll()).length
  return {
    total: userTotal,
    items: userPage,
    page,
    count,
  }
}

export const curUser = async (ctx: Context): Promise<User> => {
  const bearerToken = ctx.header.authorization
  const token = bearerToken!.split(' ')[1]
  const userId = decodeToken(token!)
  const user = await getUserById(userId)
  return user
}
