import MySQL from 'mysql2';
import Async from 'async';
import CONFIG from '../../config';
import Logger from '../log';

const DATABASE = CONFIG.DATABASE;

const pool = MySQL.createPool({
  host: DATABASE.HOST,
  user: DATABASE.USER,
  password: DATABASE.PASSWORD,
  database: DATABASE.DB_NAME,
  port: DATABASE.PORT
});

/**
 * 普通查询
 * @param sql 查询语句
 * @param data 数据
 */
export function loadBySql(sql: string, data?: any) {
  return new Promise((resolve, reject) => {
    Logger.query(sql, data);
    pool.query(sql, data, async (err, results) => {
      console.log(err);
      console.log(results);
      if (err) {
        return throwError(reject, '服务器发生错误: 数据库查询语句出错');
      }
      resolve(results);
    });
  });
}

/**
 * 事务查询 按顺序查询但不依赖上一条查询结果 返回对应查询语句数量的数组
 * @param sqlList 查询列表 [{sql, data}, ...]
 */
export function execTrans(sqlList: any[]) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return throwError(reject, '服务器发生错误: 创建数据库连接失败');
      connection.beginTransaction((err) => {
        if (err) return throwError(reject, '服务器发生错误: 事务开启失败');
        let params = handleExceTransSQLParams(reject, connection, sqlList);
        // 串联执行多个异步
        Async.series(params, (err, results) => {
          if (err) {
            return handleExceTransRoolback(
              reject,
              connection,
              '服务器发生错误: 事务执行失败'
            );
          }
          connection.commit((err) => {
            if (err) {
              return handleExceTransRoolback(
                reject,
                connection,
                '服务器发生错误: 事务执行失败'
              );
            }
            connection.release();
            resolve(results);
          });
        });
      });
    });
  });
}

/**
 * 处理多条 SQL 语句查询
 */
function handleExceTransSQLParams(
  reject: any,
  connection: any,
  sqlList: any[]
) {
  let queryArr: any[] = [];
  sqlList.forEach((item) => {
    Logger.query(item.sql, item.data);
    let temp = function (cb: Function) {
      connection.query(item.sql, item.data, (err: any, results: any) => {
        if (err) {
          handleExceTransRoolback(
            reject,
            connection,
            '服务器发生错误: 数据库查询语句出错',
            item
          );
        } else cb(null, results);
      });
    };
    queryArr.push(temp);
  });
  return queryArr;
}

// 普通错误抛出异常
function throwError(reject: any, message: string, ...arg: any) {
  Logger.error(message, ...arg);
  reject(global.UnifyResponse.serverErrorException(message));
}

// 事务查询发生错误时回滚并返回错误
function handleExceTransRoolback(
  reject: any,
  connection: any,
  message: string,
  ...arg: any
) {
  connection.roolback(() => {
    Logger.error(message, ...arg);
    connection.release();
    reject(global.UnifyResponse.serverErrorException(message));
  });
}
