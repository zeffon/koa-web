import { User } from '../model'

export const create = async (user) => {
  return User.create(user)
}

export const update = async (id, payload) => {
  const user = await User.findByPk(id)

  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }

  return user.update(payload)
}

export const getById = async (id) => {
  const user = await User.findByPk(id)

  if (!user) {
    global.UnifyResponse.notFoundException(10020)
  }
  return user
}

export const deleteById = async (id) => {
  const numDeleted = await User.destroy({
    where: { id }
  })

  return !!numDeleted
}

export const getAll = async () => {
  return User.findAll()
}
