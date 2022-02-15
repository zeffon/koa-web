import MySQL from 'mysql2';
import Async from 'async';
import CONFIG from '../../config';

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
 * 参数 sql 查询语句；data? 查询数据 字符串或数据
 */
export function query(sql: string, data?: any) {
  return new Promise((resolve, reject) => {
    pool.query(sql, data, async (err, results) => {
      console.log(err);
      console.log(results);
      if (err) {
        // TODO
      }
      resolve(results);
    });
  });
}

/**
 * 事务查询 按顺序查询但不依赖上一条查询结果 返回对应查询语句数量的数组
 * 参数 sqlList 查询列表 [{sql, data}, ...]
 */
export function execTrans(sqlList: any[]) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return 'error';
      connection.beginTransaction((err) => {
        if (err) return 'error';
        let params = handleExceTransSQLParams(reject, connection, sqlList);
        // 串联执行多个异步
        Async.series(params, (err, results) => {
          if (err) {
            // TODO
          }
          connection.commit((err) => {
            if (err) {
              // TODO
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
    let temp = function (cb: Function) {
      connection.query(item.sql, item.data, (err: any, results: any) => {
        if (err) {
          // TODO
        } else cb(null, results);
      });
    };
    queryArr.push(temp);
  });
  return queryArr;
}
