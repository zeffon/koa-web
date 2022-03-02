"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execTrans = exports.loadBySql = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const async_1 = __importDefault(require("async"));
const config_1 = __importDefault(require("../../config"));
const log_1 = __importDefault(require("../log"));
const DATABASE = config_1.default.DATABASE;
const pool = mysql2_1.default.createPool({
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
function loadBySql(sql, data) {
    return new Promise((resolve, reject) => {
        log_1.default.query(sql, data);
        pool.query(sql, data, (err, results) => __awaiter(this, void 0, void 0, function* () {
            console.log(err);
            console.log(results);
            if (err) {
                return throwError(reject, '服务器发生错误: 数据库查询语句出错');
            }
            resolve(results);
        }));
    });
}
exports.loadBySql = loadBySql;
/**
 * 事务查询 按顺序查询但不依赖上一条查询结果 返回对应查询语句数量的数组
 * @param sqlList 查询列表 [{sql, data}, ...]
 */
function execTrans(sqlList) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return throwError(reject, '服务器发生错误: 创建数据库连接失败');
            connection.beginTransaction((err) => {
                if (err)
                    return throwError(reject, '服务器发生错误: 事务开启失败');
                let params = handleExceTransSQLParams(reject, connection, sqlList);
                // 串联执行多个异步
                async_1.default.series(params, (err, results) => {
                    if (err) {
                        return handleExceTransRoolback(reject, connection, '服务器发生错误: 事务执行失败');
                    }
                    connection.commit((err) => {
                        if (err) {
                            return handleExceTransRoolback(reject, connection, '服务器发生错误: 事务执行失败');
                        }
                        connection.release();
                        resolve(results);
                    });
                });
            });
        });
    });
}
exports.execTrans = execTrans;
/**
 * 处理多条 SQL 语句查询
 */
function handleExceTransSQLParams(reject, connection, sqlList) {
    let queryArr = [];
    sqlList.forEach((item) => {
        log_1.default.query(item.sql, item.data);
        let temp = function (cb) {
            connection.query(item.sql, item.data, (err, results) => {
                if (err) {
                    handleExceTransRoolback(reject, connection, '服务器发生错误: 数据库查询语句出错', item);
                }
                else
                    cb(null, results);
            });
        };
        queryArr.push(temp);
    });
    return queryArr;
}
// 普通错误抛出异常
function throwError(reject, message, ...arg) {
    log_1.default.error(message, ...arg);
    reject(global.UnifyResponse.serverErrorException(message));
}
// 事务查询发生错误时回滚并返回错误
function handleExceTransRoolback(reject, connection, message, ...arg) {
    connection.roolback(() => {
        log_1.default.error(message, ...arg);
        connection.release();
        reject(global.UnifyResponse.serverErrorException(message));
    });
}
//# sourceMappingURL=index.js.map