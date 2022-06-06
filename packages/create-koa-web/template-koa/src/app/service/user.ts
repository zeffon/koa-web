import { IUserModel } from '../model/user'
import * as userRepo from '../repository/user'

export const createUser = async (user: IUserModel): Promise<IUserModel> => {
  return userRepo.create(user)
}

export const updateUser = async (
  id: number,
  user: IUserModel
): Promise<IUserModel> => {
  const oldUser = await userRepo.getById(id)
  if (!oldUser) {
    global.UnifyResponse.notFoundException(10020)
  }
  return await oldUser!.update(user)
}

export const getUserById = async (id: number): Promise<IUserModel> => {
  const user = await userRepo.getById(id)
  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const getUserByUsername = async (
  username: string
): Promise<IUserModel> => {
  const user = await userRepo.getByUsername(username)
  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const deleteById = async (id: number): Promise<boolean> => {
  return await userRepo.deleteById(id)
}

export const getAll = async (): Promise<IUserModel[]> => {
  return await userRepo.getAll()
}
