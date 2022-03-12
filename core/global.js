"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unify_response_1 = require("./exception/unify-response");
class InitGlobal {
    constructor() { }
    init() {
        global.UnifyResponse = new unify_response_1.UnifyResponse();
    }
}
exports.default = new InitGlobal();
//# sourceMappingURL=global.js.map