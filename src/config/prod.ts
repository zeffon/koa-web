export const prodConf = {
  env: 'prod',
  database: {
    dbName: 'root',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'abcdef'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24 * 30
  },
  host: 'http://127.0.0.1:3000/'
};
