import { User } from '../model'
import { IUserModel } from '../model/user'

export const create = async (user: IUserModel) => {
  return User.create(user)
}

export const update = async (id: number, payload: IUserModel) => {
  const user = await User.findByPk(id)

  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }

  return user!.update(payload)
}

export const getById = async (id: number) => {
  const user = await User.findByPk(id)

  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user!
}

export const deleteById = async (id: number) => {
  const numDeleted = await User.destroy({
    where: { id }
  })

  return !!numDeleted
}

export const getAll = async () => {
  return User.findAll()
}
