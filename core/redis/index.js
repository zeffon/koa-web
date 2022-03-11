"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisDel = exports.redisGet = exports.redisSet = void 0;
const redis_1 = __importDefault(require("redis"));
const config_1 = __importDefault(require("../../config"));
const log_1 = __importDefault(require("../log"));
const tool_1 = require("../tool");
const REDIS = config_1.default.REDIS;
// init redis connect
const redisClient = redis_1.default.createClient(REDIS.PORT, REDIS.HOST);
// redis client authentication
redisClient.auth(config_1.default.REDIS.PASSWORD, () => {
    console.log('redis login success');
});
// Listen for redis error events
redisClient.on('error', (err) => {
    log_1.default.error('redis error', err, 'error in redis');
});
// save a key-value to redis
const redisSet = (key, value) => {
    if (!key)
        return;
    return new Promise((resolve, reject) => {
        let newValue = (0, tool_1.objectToJson)(value);
        redisClient.set(key, newValue, (err) => {
            if (err)
                reject(err);
            else
                resolve(null);
        });
    });
};
exports.redisSet = redisSet;
// get a value by key for redis
const redisGet = (key) => {
    if (!key)
        return;
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err)
                reject(err);
            else
                resolve((0, tool_1.jsonToObject)(value));
        });
    });
};
exports.redisGet = redisGet;
// delete a value by key for redis
const redisDel = (key) => {
    if (!key)
        return;
    return new Promise((resolve, reject) => {
        try {
            redisClient.del(key, (err) => {
                if (err)
                    reject(err);
                else
                    resolve(null);
            });
        }
        catch (e) {
            resolve(null);
        }
    });
};
exports.redisDel = redisDel;
//# sourceMappingURL=index.js.map