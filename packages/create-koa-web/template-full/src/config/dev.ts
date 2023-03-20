export const devConf = {
  ENV: 'dev',
  PORT: 3100,
  BASE_URL: 'http://127.0.0.1',
  PREFIX: '/api',
  SECRET: {
    JWT_KEY: 'zeffonwu',
    EXPIRES_IN: '1d',
  },
  DATABASE: {
    DIALECT: 'mysql',
    DB_NAME: 'root',
    HOST: '127.0.0.1',
    PORT: 3306,
    USER: 'root',
    PASSWORD: '123456',
  },
  REDIS: {
    ENABLED: false,
    USER: '',
    HOST: '127.0.0.1',
    PORT: 6379,
    DB: 0,
    PASSWORD: '123456',
  },
}
