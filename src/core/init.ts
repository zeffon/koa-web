import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBody from 'koa-body';
import catchError from './exception';
import InitGlobal from './global';
import swaggerRouter from './swagger';

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
    this.buildRouteAndSwagger(); // 路由与api文档
  }

  buildRouteAndSwagger() {
    this.app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());
  }
}
