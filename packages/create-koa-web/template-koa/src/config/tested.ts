/**
 * Test env
 */
export const testConf = {
  ENV: 'test',
  PORT: 3100,
  BASE_URL: 'http://127.0.0.1',
  PREFIX: '/koa-web',
  SECRET: {
    JWT_KEY: 'zeffonwu',
    EXPIRES_IN: '1h'
  },
  DATABASE: {
    DIALECT: 'mysql',
    DB_NAME: 'root',
    HOST: '127.0.0.1',
    PORT: 3306,
    USER: 'root',
    PASSWORD: '123456'
  },
  REDIS: {
    ENABLED: false,
    HOST: '127.0.0.1',
    PORT: 6379,
    PASSWORD: '123456'
  }
}
