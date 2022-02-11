import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';
import InitManager from './core/init';
import CONFIG from './config';

const app = new Koa();

app.use(Koa2Cors()).use(KoaBodyParser());

InitManager.initCore(app);

app.listen(CONFIG.PORT, () => {
  console.log(`Please open ${CONFIG.BASE_URL}`);
});
