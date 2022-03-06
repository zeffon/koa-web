"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const config_1 = __importDefault(require("../../config"));
const topRouter = new koa_swagger_decorator_1.SwaggerRouter({ prefix: config_1.default.PREFIX });
/** This is v1 routers */
const v1 = new koa_swagger_decorator_1.SwaggerRouter();
const v1Prefix = '/v1';
v1.swagger({
    prefix: `${config_1.default.PREFIX}${v1Prefix}`,
    title: 'API文档',
    description: 'API DOC',
    version: '1.0.0',
    swaggerHtmlEndpoint: '/doc.html',
    swaggerJsonEndpoint: '/json.html'
});
// point to v1 apis directory
v1.mapDir(path_1.default.resolve(__dirname, `../../app/api/v1/`));
/** This is v2 routers */
// ...
topRouter.use(v1Prefix, v1.routes());
exports.default = topRouter;
//# sourceMappingURL=index.js.map