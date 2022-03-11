"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_body_1 = __importDefault(require("koa-body"));
const exception_1 = __importDefault(require("./exception"));
const global_1 = __importDefault(require("./global"));
const swagger_1 = __importDefault(require("./swagger"));
class InitManager {
    constructor(app) {
        this.app = app;
        this.initCore();
    }
    initCore() {
        global_1.default.init(); // global var and methods
        this.app.use((0, koa2_cors_1.default)()); // cross-domain processing
        this.app.use((0, koa_body_1.default)({ multipart: true })); // body parameter processing
        this.app.use(exception_1.default); // global exception handling
        this.buildRouteAndSwagger(); // router and api docs
    }
    buildRouteAndSwagger() {
        this.app.use(swagger_1.default.routes()).use(swagger_1.default.allowedMethods());
    }
}
exports.default = InitManager;
//# sourceMappingURL=init.js.map