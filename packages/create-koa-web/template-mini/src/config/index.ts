/**
 * app env config
 * You set the parameter set NODE_ENV=production at startup and load different environments
 * 1. package.json scripts add  `"prod": "set NODE_ENV=production&&nodemon"`
 * 2. here get env decided to use different data  `const env = process.env.NODE_ENV`
 *
 * You can refer to `template-full`
 */
const CONFIG = {
  ENV: 'dev',
  PORT: 3100,
  BASE_URL: 'http://127.0.0.1',
  PREFIX: '/koa-web',
}

export default CONFIG
