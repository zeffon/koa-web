import Redis from 'redis'
import CONFIG from '../../config'
import { jsonToObject, objectToJson } from '../tool'

const REDIS = CONFIG.REDIS

class RedisClient {
  static _instance
  redisClient

  constructor() {
    if (REDIS.ENABLED) {
      const redisClient = Redis.createClient(REDIS.PORT, REDIS.HOST)
      redisClient.auth(REDIS.PASSWORD, () => {
        console.log('RedisClient has been login successfully')
      })
      redisClient.on('error', (err) => {
        redisClient.quit()
        console.log(err.message)
      })
      this.redisClient = redisClient
    }
  }

  static getInstance() {
    if (!this._instance) {
      RedisClient._instance = new RedisClient()
    }
    return RedisClient._instance
  }

  /**
   *
   * @param key string
   * @returns
   */
  get(key) {
    this.valid()
    if (!key) return
    return new Promise((resolve, reject) => {
      this.valid()
      this.redisClient.get(key, (err, value) => {
        if (err) reject(err)
        else resolve(jsonToObject(value))
      })
    })
  }

  /**
   *
   * @param key string
   * @param value any
   * @returns
   */
  setValue(key, value) {
    this.valid()
    if (!key) return
    return new Promise((resolve, reject) => {
      let newValue = objectToJson(value)
      this.redisClient.set(key, newValue, (err) => {
        if (err) reject(err)
        else resolve(null)
      })
    })
  }

  /**
   *
   * @param key string
   * @param value any
   * @param duration expire time (seconds)
   * @returns
   */
  set(key, value, duration) {
    this.valid()
    if (!key) return
    return new Promise((resolve, reject) => {
      let newValue = objectToJson(value)
      this.redisClient.set(key, newValue, 'EX', duration, (err) => {
        if (err) reject(err)
        else resolve(null)
      })
    })
  }

  /**
   *
   * @param key string
   * @returns
   */
  delete(key) {
    this.valid()
    if (!key) return
    return new Promise((resolve, reject) => {
      try {
        this.redisClient.del(key, (err) => {
          if (err) reject(err)
          else resolve(null)
        })
      } catch (e) {
        resolve(null)
      }
    })
  }

  valid() {
    if (this.redisClient === null) {
      global.UnifyResponse.serverErrorException(11001)
    }
  }
}

export default RedisClient.getInstance()
