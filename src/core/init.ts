import Koa from 'koa';
import Koa2Cors from 'koa2-cors';
import KoaBodyParser from 'koa-bodyparser';
import requireDirectory from 'require-directory';
import Router from 'koa-router';
import config from '../config';

export default class InitManager {
  static app: Koa;

  static initCore(app: Koa) {
    this.app = app;
    app.use(Koa2Cors()); // 跨域处理
    app.use(KoaBodyParser()); // body数据处理
    // 全局异常处理
    // 路由加载
    console.log(app);
    InitManager.initLoadRouters();
    // InitManager.loadHttpException()
    // InitManager.loadConfig()
  }

  // static loadConfig() {
  //     global.config = config
  // }

  static initLoadRouters() {
    //path config
    const apiDirectory = `${process.cwd()}/app/api`;
    console.log(apiDirectory);
    // requireDirectory(module, apiDirectory, {
    //     visit: whenLoadModule
    // })

    // function whenLoadModule(obj) {
    //     if(obj instanceof Router ){
    //         InitManager.app.use(obj.routes())
    //     }
    // }
  }
}
