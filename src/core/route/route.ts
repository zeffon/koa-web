import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import glob from 'glob';

const router = new Router();

export const symbolRoutePrefix: symbol = Symbol('routePrefix');

export class Route {
  static __DecoratedRouters: Map<any, Function | Function[]> = new Map();
  private router: any;
  private app: Koa;

  constructor(app: Koa) {
    this.app = app;
    this.router = router;
  }
  init() {
    glob.sync(path.join(__dirname, '../../app/api/**/*.js')).forEach((item) => {
      require(item);
    });

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}
