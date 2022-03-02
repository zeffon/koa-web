"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const swaggerRouter = new koa_swagger_decorator_1.SwaggerRouter();
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
swaggerRouter.mapDir(path_1.default.resolve(__dirname, `../../app/api/`));
exports.default = swaggerRouter;
//# sourceMappingURL=index.js.map