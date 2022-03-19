import Redis from 'redis'
import CONFIG from '../../config/index.js'
import Logger from '../log/index.js'
import { jsonToObject, objectToJson } from '../tool.js'

const REDIS = CONFIG.REDIS

class RedisClient {
  static getInstance() {
    if (!this.instance) {
      const redisClient = Redis.createClient(REDIS.PORT, REDIS.HOST)
      redisClient.auth(CONFIG.REDIS.PASSWORD, () => {
        console.log('redis login success')
      })
      redisClient.on('error', (err) => {
        global.UnifyResponse.serverErrorException('redis error')
        Logger.error('redis error', err, 'error in redis')
      })
      this.instance = redisClient
    }
    return this.instance
  }

  get(key) {
    if (!key) return
    return new Promise((resolve, reject) => {
      RedisClient.getInstance().get(key, (err, value) => {
        if (err) reject(err)
        else resolve(jsonToObject(value))
      })
    })
  }

  set(key, value) {
    if (!key) return
    return new Promise((resolve, reject) => {
      let newValue = objectToJson(value)
      RedisClient.getInstance().set(key, newValue, (err) => {
        if (err) reject(err)
        else resolve(null)
      })
    })
  }

  delete(key) {
    if (!key) return
    return new Promise((resolve, reject) => {
      try {
        RedisClient.getInstance().del(key, (err) => {
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
