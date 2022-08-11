import { IUserModel } from '../model/user'
import * as userRepo from '../repository/user'
import User from '../model/user'
import { Context } from 'koa'
import { decodeToken } from '~/core/auth'
import { Paging } from '../vo/paging'

export const createUser = async (user: IUserModel): Promise<User> => {
  const hadUser = await userRepo.getByUsername(user.username)
  if (hadUser) {
    global.UnifyResponse.parameterException(20003)
  }
  return userRepo.create(user)
}

export const updateUser = async (user: IUserModel): Promise<User> => {
  const oldUser = await userRepo.getById(user.id)
  if (!oldUser) {
    global.UnifyResponse.notFoundException(10020)
  }
  return await oldUser!.update(user)
}

export const getUserById = async (id: number): Promise<User> => {
  const user = await userRepo.getById(id)
  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const getUserByUsername = async (username: string): Promise<User> => {
  const user = await userRepo.getByUsername(username)
  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const deleteById = async (id: number): Promise<boolean> => {
  return await userRepo.deleteById(id)
}

export const getList = async (): Promise<User[]> => {
  return await userRepo.list()
}

export const getPage = async (
  page: number,
  count: number
): Promise<Paging<User>> => {
  const userPage = await userRepo.page(page, count)
  const userTotal = (await getList()).length
  return {
    total: userTotal,
    items: userPage,
    page,
    count
  }
}

export const curUser = async (ctx: Context): Promise<User> => {
  const bearerToken = ctx.header.authorization
  const token = bearerToken!.split(' ')[1]
  const userId = decodeToken(token!)
  const user = await getUserById(userId)
  return user
}
