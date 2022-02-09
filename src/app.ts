import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';

import config from './config';

const app = new Koa();

console.log('NODE_ENV', process.env.NODE_ENV);
console.log(config);

app.use(Koa2Cors()).use(KoaBodyParser());

app.listen(3000, () => {
  console.log('Please open 127.0.0.1:3000');
});
