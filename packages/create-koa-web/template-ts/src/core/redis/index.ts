import Redis from 'redis'
import CONFIG from '../../config'
import { jsonToObject, objectToJson } from '../tool'

const REDIS = CONFIG.REDIS

class RedisClient {
  static instance: {
    get: (key: string, arg1: (err: any, value: any) => void) => void
    set: (key: string, value: any, arg2: (err: any) => void) => void
    del: (key: string, arg1: (err: any) => void) => void
  }
  static getInstance() {
    if (!this.instance) {
      const redisClient = Redis.createClient(REDIS.PORT, REDIS.HOST)
      redisClient.auth(REDIS.PASSWORD, () => {
        console.log('redis login success')
      })
      redisClient.on('error', (err) => {
        console.log(err.message)
      })
      if (!REDIS.ENABLED) {
        redisClient.quit()
        global.UnifyResponse.serverErrorException(11001)
      }
      this.instance = redisClient
    }
    return this.instance
  }

  get(key: string) {
    if (!key) return
    return new Promise((resolve, reject) => {
      RedisClient.getInstance().get(key, (err: any, value) => {
        if (err) reject(err)
        else resolve(jsonToObject(value))
      })
    })
  }

  set(key: string, value: any) {
    if (!key) return
    return new Promise((resolve, reject) => {
      let newValue = objectToJson(value)
      RedisClient.getInstance().set(key, newValue, (err: any) => {
        if (err) reject(err)
        else resolve(null)
      })
    })
  }

  delete(key: string) {
    if (!key) return
    return new Promise((resolve, reject) => {
      try {
        RedisClient.getInstance().del(key, (err: any) => {
          if (err) reject(err)
          else resolve(null)
        })
      } catch (e) {
        resolve(null)
      }
    })
  }
}

export default new RedisClient()
