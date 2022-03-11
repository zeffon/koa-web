import MySQL from 'mysql2'
import Async from 'async'
import CONFIG from '../../config'
import Logger from '../log'

const DATABASE = CONFIG.DATABASE

const pool = MySQL.createPool({
  host: DATABASE.HOST,
  user: DATABASE.USER,
  password: DATABASE.PASSWORD,
  database: DATABASE.DB_NAME,
  port: DATABASE.PORT
})

/**
 * common query by sql statement
 * @param sql sql
 * @param data data
 */
export function loadBySql(sql: string, data?: any) {
  return new Promise((resolve, reject) => {
    Logger.query(sql, data)
    pool.query(sql, data, async (err, results) => {
      console.log(err)
      console.log(results)
      if (err) {
        return throwError(reject, 'Database query statement error')
      }
      resolve(results)
    })
  })
}

/**
 * Transaction query
 * Query in order but do not depend on the previous query result Returns an array corresponding to the number of query statements.
 * @param sqlList sql list [{sql, data}, ...]
 */
export function execTrans(sqlList: any[]) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return throwError(reject, 'Failed to create database connection')
      connection.beginTransaction((err) => {
        if (err)
          return throwError(reject, 'Failed to open database transaction')
        let params = handleExceTransSQLParams(reject, connection, sqlList)
        // Execute multiple async in series
        Async.series(params, (err, results) => {
          if (err) {
            return handleExceTransRoolback(
              reject,
              connection,
              'Transaction execution failed'
            )
          }
          connection.commit((err) => {
            if (err) {
              return handleExceTransRoolback(
                reject,
                connection,
                'Transaction execution failed'
              )
            }
            connection.release()
            resolve(results)
          })
        })
      })
    })
  })
}

/**
 * Handle multiple SQL query queries
 */
function handleExceTransSQLParams(
  reject: any,
  connection: any,
  sqlList: any[]
) {
  let queryArr: any[] = []
  sqlList.forEach((item) => {
    Logger.query(item.sql, item.data)
    let temp = function (cb: Function) {
      connection.query(item.sql, item.data, (err: any, results: any) => {
        if (err) {
          handleExceTransRoolback(
            reject,
            connection,
            'Database query statement error',
            item
          )
        } else cb(null, results)
      })
    }
    queryArr.push(temp)
  })
  return queryArr
}

// Normal error throws exception
function throwError(reject: any, message: string, ...arg: any) {
  Logger.error(message, ...arg)
  reject(global.UnifyResponse.serverErrorException(message))
}

// Rollback and return error when transaction query fails
function handleExceTransRoolback(
  reject: any,
  connection: any,
  message: string,
  ...arg: any
) {
  connection.roolback(() => {
    Logger.error(message, ...arg)
    connection.release()
    reject(global.UnifyResponse.serverErrorException(message))
  })
}
