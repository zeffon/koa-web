"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConf = void 0;
exports.devConf = {
    ENV: 'dev',
    PORT: 3000,
    IS_TEST: false,
    DATABASE: {
        DB_NAME: 'root',
        HOST: 'localhost',
        PORT: 3306,
        USER: 'root',
        PASSWORD: '123456'
    },
    REDIS: {
        HOST: '127.0.0.1',
        PORT: 6379,
        PASSWORD: '123456'
    },
    BASE_URL: 'http://localhost'
};
//# sourceMappingURL=dev.js.map