import { IUserModel } from '../model/user'
import * as userRepo from '../repository/user'

export const createUser = async (payload: IUserModel): Promise<IUserModel> => {
  return userRepo.create(payload)
}

export const updateUser = async (
  id: number,
  payload: IUserModel
): Promise<IUserModel> => {
  return userRepo.update(id, payload)
}

export const getUserById = (id: number): Promise<IUserModel> => {
  return userRepo.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
  return userRepo.deleteById(id)
}

export const getAll = (): Promise<IUserModel[]> => {
  return userRepo.getAll()
}
