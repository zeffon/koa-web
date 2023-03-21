import type { Cache, Milliseconds } from 'cache-manager'
import { caching } from 'cache-manager'

class CacheClient {
  private static instance: CacheClient
  private cache: Cache | null = null

  private constructor() {}

  public async init(): Promise<void> {
    const config = {
      max: 100,
      ttl: 10 * 1000,
    }
    this.cache = await caching('memory', config)
  }

  public static getInstance(): CacheClient {
    if (!CacheClient.instance) {
      CacheClient.instance = new CacheClient()
      CacheClient.instance.init()
    }
    return CacheClient.instance
  }

  public getCache(): Cache {
    if (!this.cache) {
      this.init()
    }
    return this.cache!
  }

  public async get<T>(key: string): Promise<T | undefined> {
    return await this.getCache().get(key)
  }

  public async set<T>(
    key: string,
    value: T,
    ttl?: Milliseconds,
  ): Promise<void> {
    return await this.getCache().set(key, value, ttl)
  }

  public async del(key: string): Promise<void> {
    return await this.getCache().del(key)
  }

  public async wrap<T>(
    key: string,
    wrapperFn: () => Promise<T>,
    ttl?: Milliseconds,
  ): Promise<T> {
    return await this.getCache().wrap(key, wrapperFn, ttl)
  }
}

export default CacheClient.getInstance()
