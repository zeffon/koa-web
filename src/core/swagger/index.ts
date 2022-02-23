import path from 'path';
import { SwaggerRouter } from 'koa-swagger-decorator';

const swaggerRouter = new SwaggerRouter();

swaggerRouter.swagger({
  title: 'API文档',
  description: 'API DOC',
  version: '1.0.0',
  // [optional] default is /swagger-html
  swaggerHtmlEndpoint: '/doc.html',
  // [optional] default is /swagger-json
  swaggerJsonEndpoint: '/json.html'
});

// 查找对应目录下的api文件夹
swaggerRouter.mapDir(path.resolve(__dirname, `../../app/api/`));

export default swaggerRouter;
