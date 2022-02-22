import Koa from 'koa';
import path from 'path';
import CONFIG from '../../config';
import { SwaggerRouter } from 'koa-swagger-decorator';

const fileType = CONFIG.IS_TEST ? 'ts' : 'js';
const swaggerRouter = new SwaggerRouter();

export default class KoaDoc {
  private app: Koa;
  constructor(app: Koa) {
    this.app = app;
  }

  init() {
    swaggerRouter.swagger({
      title: 'API文档',
      description: 'API DOC',
      version: '1.0.0'
    });

    // 查找对应目录下的api文件夹
    swaggerRouter.mapDir(path.resolve(__dirname, `../../app/api/v1/`));

    this.app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());
    console.log(swaggerRouter);
  }
}
