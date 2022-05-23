import Redis from 'redis'
import CONFIG from '../../config'
import { jsonToObject, objectToJson } from '../tool'

const REDIS = CONFIG.REDIS

class RedisClient {
  private static _instance: RedisClient
  private redisClient: Redis.RedisClient | null = null

  private constructor() {
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

  public static getInstance() {
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
  public get(key: string) {
    this.valid()
    if (!key) return
    return new Promise((resolve, reject) => {
      this.valid()
      this.redisClient!.get(key, (err: any, value: any) => {
        if (err) reject(err)
        else resolve(jsonToObject(value))
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
  public set(key: string, value: any, duration?: number) {
    this.valid()
    if (!key) return
    return new Promise((resolve, reject) => {
      let newValue = objectToJson(value)
      if (duration) {
        this.redisClient!.set(key, newValue, 'EX', duration, (err: any) => {
          if (err) reject(err)
          else resolve(null)
        })
      } else {
        this.redisClient!.set(key, newValue, (err: any) => {
          if (err) reject(err)
          else resolve(null)
        })
      }
    })
  }

  /**
   *
   * @param key string
   * @returns
   */
  public delete(key: string) {
    this.valid()
    if (!key) return
    return new Promise((resolve, reject) => {
      try {
        this.redisClient!.del(key, (err: any) => {
          if (err) reject(err)
          else resolve(null)
        })
      } catch (e) {
        resolve(null)
      }
    })
  }

  private valid() {
    if (this.redisClient === null) {
      global.UnifyResponse.serverErrorException(11001)
    }
  }
}

export default RedisClient.getInstance()
