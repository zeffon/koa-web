import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';
import { Route } from './route/route';
import catchError from './exception';
import InitGlobal from './validator/valid-tip';

export default class InitManager {
  private app: Koa;

  constructor(app: Koa) {
    this.app = app;
    this.initCore();
  }

  initCore() {
    InitGlobal.init(); // 异常校验器信息
    this.app.use(Koa2Cors()); // 跨域处理
    this.app.use(KoaBodyParser()); // body数据处理
    this.app.use(catchError); // 全局异常处理
    const router = new Route(this.app); // 路由加载
    router.init();
  }
}
