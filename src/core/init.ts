import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBody from 'koa-body';
import { Route } from './route/route';
import catchError from './exception';
import InitGlobal from './global';
import KoaDoc from './swagger';

export default class InitManager {
  private app: Koa;

  constructor(app: Koa) {
    this.app = app;
    this.initCore();
  }

  initCore() {
    InitGlobal.init(); // 全局变量和方法
    this.app.use(Koa2Cors()); // 跨域处理
    this.app.use(KoaBody({ multipart: true })); // body参数处理
    this.app.use(catchError); // 全局异常处理
    // const route = new Route(this.app); // 路由加载
    // route.init();
    const koaDoc = new KoaDoc(this.app);
    koaDoc.init();
  }
}
