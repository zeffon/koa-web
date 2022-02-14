import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';
import { Route } from './route/route';

export default class InitManager {
  private app: Koa;

  constructor(app: Koa) {
    this.app = app;
    this.initCore(app);
  }

  initCore(app: Koa) {
    app.use(Koa2Cors()); // 跨域处理
    app.use(KoaBodyParser()); // body数据处理
    // 全局异常处理
    // 路由加载
    const router = new Route(this.app);
    router.init();
  }
}
