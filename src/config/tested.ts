/**
 * 测试环境
 * 注意： 使用`pnpm test`测试时，是直接运行ts文件，那么路由中去获取js文件是行不通的
 */
export const testConf = {
  ENV: 'test',
  PORT: 3100,
  IS_TEST: true,
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
  BASE_URL: 'http://localhost'
};
