import NodeCache from 'node-cache'

type CacheKey = string | number
const ttlSeconds = 100

/**
 * The CacheClient will be cleared with the restart of the process.
 */
class CacheClient {
  private static _instance: CacheClient

  private cache: NodeCache

  private constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 1.2
    })
  }

  public static getInstance(): CacheClient {
    if (!CacheClient._instance) {
      CacheClient._instance = new CacheClient(ttlSeconds)
    }

    return CacheClient._instance
  }

  public get<T>(key: CacheKey): T | undefined {
    return this.cache.get(key)
  }

  public set<T>(key: CacheKey, data: T): void {
    this.cache.set(key, data)
  }

  public delete(key: CacheKey): void {
    this.cache.del(key)
  }

  public hasKey(key: CacheKey): boolean {
    return this.cache.has(key)
  }
}

export default CacheClient.getInstance()
