"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_tip_1 = require("./validator/valid-tip");
const unify_response_1 = require("./exception/unify-response");
class InitGlobal {
    constructor() { }
    init() {
        global.Validator = valid_tip_1.Validator;
        global.UnifyResponse = new unify_response_1.UnifyResponse();
    }
}
exports.default = new InitGlobal();
//# sourceMappingURL=global.js.map