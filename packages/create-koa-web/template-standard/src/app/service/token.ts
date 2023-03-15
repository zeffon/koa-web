import type { tokenSchema } from '../api/v1/token'
import { getUserByUsername } from './user'
import { generateToken } from '~/core/auth'

export const userLogin = async (userData: typeof tokenSchema) => {
  const username = userData.username as unknown
  const password = userData.password as unknown
  const user = await getUserByUsername(username as string)
  if (user.password !== password) {
    global.UnifyResponse.parameterException(20001)
  }
  return generateToken(user.id)
}

export const code2Session = async (userData: typeof tokenSchema) => {
  // TODO generate token of mini-pro
  console.log(userData)
}
