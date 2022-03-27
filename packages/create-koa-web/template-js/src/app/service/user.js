import * as userRepo from '../repository/user'

export const createUser = async (payload) => {
  return userRepo.create(payload)
}

export const updateUser = async (id, payload) => {
  return userRepo.update(id, payload)
}

export const getUserById = (id) => {
  return userRepo.getById(id)
}

export const deleteById = (id) => {
  return userRepo.deleteById(id)
}

export const getAll = () => {
  return userRepo.getAll()
}
