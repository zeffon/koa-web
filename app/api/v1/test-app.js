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
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const validator_1 = require("../../../core/validator");
const user_1 = require("../../valid/user");
const tag = (0, koa_swagger_decorator_1.tags)(['test']);
const registerSchema = {
    email: {
        type: 'string',
        required: false,
        rules: [
            new validator_1.Rule('isLength', '至少12个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new validator_1.Rule('isEmail', '不符合Email规范')
        ]
    },
    nickname: {
        type: 'string',
        required: false,
        rules: [
            new validator_1.Rule('isLength', '至少12个字符，最多32个字符', {
                min: 6,
                max: 32
            })
        ]
    },
    password1: { type: 'string', required: true, rules: [] },
    password2: { type: 'string', required: true }
};
let TestController = class TestController {
    static testApp(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = 'Hello World!';
        });
    }
    static register(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const v = yield new user_1.RegisterValidator().validate(ctx);
            const user = {
                email: v.get('query.email'),
                nickname: v.get('query.nickname'),
                password: v.get('query.password2')
            };
            global.UnifyResponse.createSuccess({ message: '注册成功' });
        });
    }
    static register2(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const v = yield new validator_1.ParamValidator(registerSchema).validate(ctx);
            const email = v.get('body.email');
            console.log(email);
            const user = {
                email: v.get('body.email'),
                nickname: v.get('body.nickname'),
                password: v.get('body.password2')
            };
            console.log(user);
            global.UnifyResponse.createSuccess({ message: '注册成功' });
        });
    }
};
__decorate([
    (0, koa_swagger_decorator_1.request)('get', ''),
    (0, koa_swagger_decorator_1.summary)('应用连接测试'),
    (0, koa_swagger_decorator_1.description)('测试系统是否连接成功, 同时验证单元测试'),
    tag
], TestController, "testApp", null);
__decorate([
    (0, koa_swagger_decorator_1.request)('get', '/register'),
    (0, koa_swagger_decorator_1.summary)('注册'),
    (0, koa_swagger_decorator_1.description)('自定义校验类进行校验方式'),
    tag,
    (0, koa_swagger_decorator_1.query)(registerSchema)
], TestController, "register", null);
__decorate([
    (0, koa_swagger_decorator_1.request)('post', '/register2'),
    (0, koa_swagger_decorator_1.summary)('注册'),
    (0, koa_swagger_decorator_1.description)('配合Swagger的Schema进行校验'),
    tag,
    (0, koa_swagger_decorator_1.body)(registerSchema)
], TestController, "register2", null);
TestController = __decorate([
    (0, koa_swagger_decorator_1.prefix)('/test')
], TestController);
exports.default = TestController;
//# sourceMappingURL=test-app.js.map