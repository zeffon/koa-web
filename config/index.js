"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * System env config
 */
const dev_1 = require("./dev");
const prod_1 = require("./prod");
const tested_1 = require("./tested");
const env = process.env.NODE_ENV;
const CONFIG = env === 'test' ? tested_1.testConf : env === 'production' ? prod_1.prodConf : dev_1.devConf;
exports.default = CONFIG;
//# sourceMappingURL=index.js.map