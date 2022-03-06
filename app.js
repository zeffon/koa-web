"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const init_1 = __importDefault(require("./core/init"));
const config_1 = __importDefault(require("./config"));
const app = new koa_1.default();
new init_1.default(app);
app.listen(config_1.default.PORT, () => {
    console.log(`Please open ${config_1.default.BASE_URL}:${config_1.default.PORT}${config_1.default.PREFIX}/v1/doc.html`);
});
exports.default = app;
//# sourceMappingURL=app.js.map