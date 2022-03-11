"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../core/mysql");
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const tag = (0, koa_swagger_decorator_1.tags)(['mysql']);
const idSchema = {
    id: { type: 'number', required: true }
};
let MysqlController = class MysqlController {
    path(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.params);
            const id = ctx.params.id;
            let sql = `SELECT * FROM user WHERE id = ${id}`;
            const res = yield (0, mysql_1.loadBySql)(sql);
            ctx.body = res;
        });
    }
    query(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.query);
            const id = ctx.query.id;
            let sql = `SELECT * FROM user WHERE id = ${id}`;
            const res = yield (0, mysql_1.loadBySql)(sql);
            ctx.body = res;
        });
    }
    body(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.request.body);
            const id = ctx.request.body.id;
            let sql = `SELECT * FROM user WHERE id = ${id}`;
            const res = yield (0, mysql_1.loadBySql)(sql);
            ctx.body = res;
        });
    }
};
__decorate([
    (0, koa_swagger_decorator_1.request)('get', '/user/{id}'),
    (0, koa_swagger_decorator_1.summary)('URL param'),
    (0, koa_swagger_decorator_1.description)('example: /mysql/user/1'),
    tag,
    (0, koa_swagger_decorator_1.path)({
        id: { type: 'number', required: true, default: 1, description: 'id' }
    })
], MysqlController.prototype, "path", null);
__decorate([
    (0, koa_swagger_decorator_1.request)('get', '/user'),
    (0, koa_swagger_decorator_1.summary)('query param'),
    (0, koa_swagger_decorator_1.description)('example: /mysql/user?id=1'),
    tag,
    (0, koa_swagger_decorator_1.query)(idSchema)
], MysqlController.prototype, "query", null);
__decorate([
    (0, koa_swagger_decorator_1.request)('post', '/user'),
    (0, koa_swagger_decorator_1.summary)('body param'),
    (0, koa_swagger_decorator_1.description)('example: /mysql/user  json: { id: 1 }'),
    tag,
    (0, koa_swagger_decorator_1.body)(idSchema)
], MysqlController.prototype, "body", null);
MysqlController = __decorate([
    (0, koa_swagger_decorator_1.prefix)('/mysql')
], MysqlController);
exports.default = MysqlController;
//# sourceMappingURL=mysql.js.map