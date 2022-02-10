import requireDirectory from 'require-directory';
import Router from 'koa-router';
import config from '../config';

export default class InitManager {
  static initCore(app: any) {
    //入口方法
    // InitManager.app = app
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
