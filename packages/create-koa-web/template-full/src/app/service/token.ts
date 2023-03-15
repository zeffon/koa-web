import axios from 'axios'
import type { tokenSchema } from '../api/v1/token'
import { getByOpenid } from '../repository/user'
import type { User } from '../model'
import { createUser, getUserByUsername } from './user'
import { generateToken } from '~/core/auth'
import CONFIG from '~/config'

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
  const WX = CONFIG.WX
  const formatUrl = `${WX.SESSION_URL}?appid=${WX.APP_ID}&secret=${
    WX.APP_SECRET
  }&js_code=${userData!.username}&grant_type=authorization_code`

  const { data } = await axios.get(formatUrl)
  if (data.errcode && data.errcode !== 1) {
    global.UnifyResponse.parameterException(20002)
  }
  return openid2User(data.openid)
}

export const openid2User = async (openid: string) => {
  if (openid === null || openid === undefined) {
    global.UnifyResponse.parameterException(20002)
  }
  const user = await getByOpenid(openid)
  if (user) {
    return generateToken(user.id)
  }
  const newUser = await createUser({ openid } as User)
  return generateToken(newUser.id)
}
