export const devConf = {
  ENV: 'dev',
  PORT: 3000,
  BASE_URL: 'http://127.0.0.1',
  PREFIX: '/koa-web',
  SECRET: {
    JWT_KEY: 'zeffonwu',
    EXPIRES_IN: '1d'
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
  },
  WX: {
    APP_ID: 'app_id',
    APP_SECRET: 'app_secret',
    SESSION_URL: 'https://api.weixin.qq.com/sns/jscode2session'
  }
}
