import type { RedisClientType } from 'redis'
import { createClient } from 'redis'
import CONFIG from '~/config'

const REDIS = CONFIG.REDIS

class RedisClient {
  private static instance: RedisClient
  private redis: RedisClientType | null = null

  private constructor() {}

  public async init() {
    // redis[s]://[[username][:password]@][host][:port]
    const redis: RedisClientType = createClient({
      url: `redis://${REDIS.USER}:${REDIS.PASSWORD}@${REDIS.HOST}:${REDIS.PORT}`,
    })
    redis
      .connect()
      .then(() => {
        this.redis = redis
        console.log('The Redis service is connected')
      })
      .catch((err: string) => {
        console.log('The Redis service error: ', err)
        redis.quit()
      })
  }

  public static getInstance() {
    if (!this.instance) {
      RedisClient.instance = new RedisClient()
      RedisClient.instance.init()
    }
    return RedisClient.instance
  }

  public getRedis(): RedisClientType {
    if (!this.redis) {
      this.init()
    }
    return this.redis!
  }

  /**
   *
   * @param key string
   * @returns Promise<T | undefined>
   */
  public get = async <T>(key: string): Promise<T | undefined> => {
    const result = await this.getRedis().get(key)
    if (!result) {
      return undefined
    }
    return JSON.parse(result)
  }

  /**
   *
   * @param key string
   * @param value any
   * @param duration expire time (seconds)
   * @returns Promise<void>
   */
  public set = async <T>(
    key: string,
    value: T,
    duration?: number,
  ): Promise<void> => {
    if (duration) {
      await this.getRedis()
        .multi()
        .set(key, JSON.stringify(value))
        .expire(key, duration)
        .exec()
    }
    await this.getRedis().set(key, JSON.stringify(value))
  }

  /**
   *
   * @param key string
   * @returns Promise<void>
   */
  public del = async (key: string): Promise<void> => {
    await this.getRedis().del(key)
  }
}

export default RedisClient.getInstance()
