import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';

const Server = new Koa();

Server.use(Koa2Cors()).use(KoaBodyParser());

Server.listen(3000, () => {
  console.log('Please open 127.0.0.1:3000');
});
