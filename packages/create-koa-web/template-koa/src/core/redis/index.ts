import { createClient, RedisClientType } from 'redis'
import CONFIG from '~/config'
import { jsonToObject, objectToJson } from '../tool'

const REDIS = CONFIG.REDIS

class RedisClient {
  private static _instance: RedisClient
  private redisClient: RedisClientType | null = null

  private constructor() {
    if (REDIS.ENABLED) {
      const redisClient: RedisClientType = createClient({
        url: `redis[${REDIS.DB}]://${REDIS.USER}:${REDIS.PASSWORD}@${REDIS.HOST}:${REDIS.PORT}`,
      })
      redisClient
        .connect()
        .then(() => {
          this.redisClient = redisClient
        })
        .catch((err) => {
          console.log('Redis Client Error', err)
          redisClient.quit()
        })
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
  public get = async (key: string) => {
    this.valid()
    const result = await this.redisClient!.get(key)
    if (result) {
      return JSON.parse(result)
    }
    return result
  }

  /**
   *
   * @param key string
   * @param value any
   * @param duration expire time (seconds)
   * @returns
   */
  public set = async <T>(key: string, value: T, duration?: number) => {
    this.valid()
    if (duration) {
      await this.redisClient!.multi()
        .set(key, JSON.stringify(value))
        .expire(key, duration)
        .exec()
      return ''
    }
    return await this.redisClient!.set(key, JSON.stringify(value))
  }

  /**
   *
   * @param key string
   * @returns
   */
  public delete = async (key: string) => {
    this.valid()
    return await this.redisClient!.del(key)
  }

  private valid() {
    if (this.redisClient === null) {
      global.UnifyResponse.serverErrorException(11001)
    }
  }
}

export default RedisClient.getInstance()
