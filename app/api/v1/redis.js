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
const redis_1 = require("../../../core/redis");
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const tag = (0, koa_swagger_decorator_1.tags)(['redis']);
const idSchema = {
    id: { type: 'number', required: true }
};
let RedisController = class RedisController {
    getValue(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = ctx.params.id + '';
            const res = yield (0, redis_1.redisGet)(id);
            ctx.body = res;
        });
    }
    setValue(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = ctx.request.body.id;
            yield (0, redis_1.redisSet)(id, `this user is ${id}`);
            global.UnifyResponse.createSuccess({});
        });
    }
};
__decorate([
    (0, koa_swagger_decorator_1.request)('get', '/user/{id}'),
    (0, koa_swagger_decorator_1.summary)('Redis获取'),
    tag,
    (0, koa_swagger_decorator_1.path)(idSchema)
], RedisController.prototype, "getValue", null);
__decorate([
    (0, koa_swagger_decorator_1.request)('post', '/user'),
    (0, koa_swagger_decorator_1.summary)('Redis赋值'),
    tag,
    (0, koa_swagger_decorator_1.body)(idSchema)
], RedisController.prototype, "setValue", null);
RedisController = __decorate([
    (0, koa_swagger_decorator_1.prefix)('/api/redis')
], RedisController);
exports.default = RedisController;
//# sourceMappingURL=redis.js.map