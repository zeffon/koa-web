/**
 * Test env
 */
export const testConf = {
  ENV: 'test',
  PORT: 3100,
  DATABASE: {
    DB_NAME: 'root',
    HOST: 'localhost',
    PORT: 3306,
    USER: 'root',
    PASSWORD: '123456'
  },
  REDIS: {
    HOST: '127.0.0.1',
    PORT: 6379,
    PASSWORD: '123456'
  },
  BASE_URL: 'http://localhost',
  PREFIX: '/koa-web'
}
