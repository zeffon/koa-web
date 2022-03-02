"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodConf = void 0;
exports.prodConf = {
    ENV: 'prod',
    PORT: 3200,
    IS_TEST: false,
    DATABASE: {
        DB_NAME: 'root',
        HOST: '127.0.0.1',
        PORT: 3306,
        USER: 'root',
        PASSWORD: '123456'
    },
    REDIS: {
        HOST: '127.0.0.1',
        PORT: 6379,
        PASSWORD: '123456'
    },
    BASE_URL: 'http://127.0.0.1'
};
//# sourceMappingURL=prod.js.map