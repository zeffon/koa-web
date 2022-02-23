import Redis from 'redis';
import CONFIG from '../../config';
import Logger from '../log';
import { jsonToObject, objectToJson } from '../tool';

const REDIS = CONFIG.REDIS;

// 创建 redis 连接
const redisClient = Redis.createClient(REDIS.PORT, REDIS.HOST);

// 认证
redisClient.auth(CONFIG.REDIS.PASSWORD, () => {
  console.log('redis 登录成功');
});

// 监听 redis 错误事件
redisClient.on('error', (err) => {
  Logger.error('redis 发生错误', err, 'redis 发生错误');
});

// 保存 redis 值
export const redisSet = (key: string, value: any) => {
  if (!key) return;
  return new Promise((resolve, reject) => {
    let newValue = objectToJson(value);
    redisClient.set(key, newValue, (err: any) => {
      if (err) reject(err);
      else resolve(null);
    });
  });
};

// 获取 redis 值
export const redisGet = (key: string) => {
  if (!key) return;
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err: any, value) => {
      if (err) reject(err);
      else resolve(jsonToObject(value));
    });
  });
};

// 删除 redis 值
export const redisDel = (key: string) => {
  if (!key) return;
  return new Promise((resolve, reject) => {
    try {
      redisClient.del(key, (err: any) => {
        if (err) reject(err);
        else resolve(null);
      });
    } catch (e) {
      resolve(null);
    }
  });
};
