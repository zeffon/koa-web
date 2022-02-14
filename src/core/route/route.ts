import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import glob from 'glob';
import { sureIsArray, toPath } from '../tool';

const router = new Router();

export const routePrefix: symbol = Symbol('route-prefix');

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

    for (let [config, controller] of Route.__DecoratedRouters) {
      let controllers: any[] = sureIsArray(controller);
      let prefixPath = config.target[routePrefix];
      let routerPaths: string[] = [];
      routerPaths.push(toPath(prefixPath, config.path));

      controllers.forEach((controller) => {
        routerPaths.forEach((routerPath) => {
          this.router[config.method](routerPath, controller);
        });
      });
    }
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}
