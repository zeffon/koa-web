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
 * common query by sql statement
 * @param sql sql
 * @param data data
 */
function loadBySql(sql, data) {
    return new Promise((resolve, reject) => {
        log_1.default.query(sql, data);
        pool.query(sql, data, (err, results) => __awaiter(this, void 0, void 0, function* () {
            console.log(err);
            console.log(results);
            if (err) {
                return throwError(reject, 'Database query statement error');
            }
            resolve(results);
        }));
    });
}
exports.loadBySql = loadBySql;
/**
 * Transaction query
 * Query in order but do not depend on the previous query result Returns an array corresponding to the number of query statements.
 * @param sqlList sql list [{sql, data}, ...]
 */
function execTrans(sqlList) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return throwError(reject, 'Failed to create database connection');
            connection.beginTransaction((err) => {
                if (err)
                    return throwError(reject, 'Failed to open database transaction');
                let params = handleExceTransSQLParams(reject, connection, sqlList);
                // Execute multiple async in series
                async_1.default.series(params, (err, results) => {
                    if (err) {
                        return handleExceTransRoolback(reject, connection, 'Transaction execution failed');
                    }
                    connection.commit((err) => {
                        if (err) {
                            return handleExceTransRoolback(reject, connection, 'Transaction execution failed');
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
 * Handle multiple SQL query queries
 */
function handleExceTransSQLParams(reject, connection, sqlList) {
    let queryArr = [];
    sqlList.forEach((item) => {
        log_1.default.query(item.sql, item.data);
        let temp = function (cb) {
            connection.query(item.sql, item.data, (err, results) => {
                if (err) {
                    handleExceTransRoolback(reject, connection, 'Database query statement error', item);
                }
                else
                    cb(null, results);
            });
        };
        queryArr.push(temp);
    });
    return queryArr;
}
// Normal error throws exception
function throwError(reject, message, ...arg) {
    log_1.default.error(message, ...arg);
    reject(global.UnifyResponse.serverErrorException(message));
}
// Rollback and return error when transaction query fails
function handleExceTransRoolback(reject, connection, message, ...arg) {
    connection.roolback(() => {
        log_1.default.error(message, ...arg);
        connection.release();
        reject(global.UnifyResponse.serverErrorException(message));
    });
}
//# sourceMappingURL=index.js.map