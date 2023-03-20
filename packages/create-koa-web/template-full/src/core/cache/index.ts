import type { Cache, Milliseconds } from 'cache-manager'
import { caching } from 'cache-manager'

class CacheClient<T> {
  private static instance: CacheClient<any>
  private cache: Cache | null = null

  private constructor() {}

  private async initializeCache(): Promise<void> {
    const config = {
      max: 100,
      ttl: 10 * 1000,
    }
    this.cache = await caching('memory', config)
  }

  public static getInstance<T>(): CacheClient<T> {
    if (!CacheClient.instance) {
      CacheClient.instance = new CacheClient<T>()
      CacheClient.instance.initializeCache()
    }
    return CacheClient.instance
  }

  public getCache(): Cache {
    return this.cache!
  }

  public async get(key: string): Promise<T | undefined> {
    return this.getCache().get(key)
  }

  public async set(
    key: string,
    value: unknown,
    ttl?: Milliseconds,
  ): Promise<void> {
    return this.getCache().set(key, value, ttl)
  }

  public async del(key: string): Promise<void> {
    return this.getCache().del(key)
  }

  public async wrap<T>(
    key: string,
    wrapperFn: () => Promise<T>,
    ttl?: Milliseconds,
  ): Promise<T> {
    return this.getCache().wrap(key, wrapperFn, ttl)
  }
}

export default CacheClient
