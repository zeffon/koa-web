export const devConf = {
  ENV: 'development',
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
    TIMEZONE: '+08:00',
  },
  REDIS: {
    ENABLED: false,
    USER: '', // redis dufault user is ''
    HOST: '127.0.0.1',
    PORT: 6379,
    PASSWORD: '123456',
  },
}
