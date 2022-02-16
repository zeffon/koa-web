import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';
import { Route } from './route/route';
import catchError from './exception';

export default class InitManager {
  private app: Koa;

  constructor(app: Koa) {
    this.app = app;
    this.initCore();
  }

  initCore() {
    this.app.use(Koa2Cors()); // 跨域处理
    this.app.use(KoaBodyParser()); // body数据处理
    this.app.use(catchError); // 全局异常处理
    // 路由加载
    const router = new Route(this.app);
    router.init();
  }
}
