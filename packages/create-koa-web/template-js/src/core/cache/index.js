import NodeCache from 'node-cache'

const ttlSeconds = 100

/**
 * The CacheClient will be cleared with the restart of the process.
 */
class CacheClient {
  static _instance

  cache

  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 1.2
    })
  }

  static getInstance() {
    if (!CacheClient._instance) {
      CacheClient._instance = new CacheClient(ttlSeconds)
    }

    return CacheClient._instance
  }

  get(key) {
    return this.cache.get(key)
  }

  set(key, data) {
    this.cache.set(key, data)
  }

  delete(key) {
    this.cache.del(key)
  }

  hasKey(key) {
    return this.cache.has(key)
  }
}

export default CacheClient.getInstance()
