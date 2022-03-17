import Redis from 'redis'
import CONFIG from '../../config'
import Logger from '../log'
import { jsonToObject, objectToJson } from '../tool'

const REDIS = CONFIG.REDIS

// init redis connect
const redisClient = Redis.createClient(REDIS.PORT, REDIS.HOST)

// redis client authentication
redisClient.auth(CONFIG.REDIS.PASSWORD, () => {
  console.log('redis login success')
})

// Listen for redis error events
redisClient.on('error', (err) => {
  Logger.error('redis error', err, 'error in redis')
})

// save a key-value to redis
export const redisSet = (key: string, value: any) => {
  if (!key) return
  return new Promise((resolve, reject) => {
    let newValue = objectToJson(value)
    redisClient.set(key, newValue, (err: any) => {
      if (err) reject(err)
      else resolve(null)
    })
  })
}

// get a value by key for redis
export const redisGet = (key: string) => {
  if (!key) return
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err: any, value) => {
      if (err) reject(err)
      else resolve(jsonToObject(value))
    })
  })
}

// delete a value by key for redis
export const redisDel = (key: string) => {
  if (!key) return
  return new Promise((resolve, reject) => {
    try {
      redisClient.del(key, (err: any) => {
        if (err) reject(err)
        else resolve(null)
      })
    } catch (e) {
      resolve(null)
    }
  })
}
