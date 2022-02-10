import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';
import InitManager from './core/init';

const app = new Koa();

app.use(Koa2Cors()).use(KoaBodyParser());

InitManager.initCore(app);

app.listen(3000, () => {
  console.log('Please open 127.0.0.1:3000');
});
