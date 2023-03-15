/**
 * Custom HTTP exception error code
 * [errorCode, 'errorCode message']
 */
const CODE = new Map([
  [0, 'ok'],
  [9999, 'Server Unknown Exception'],

  [10000, 'Generic Exception'],
  [10001, 'Generic parameter error'],
  [10002, 'The resource not found'],
  [10003, 'No suitable login method found'],

  [20000, 'User Module Generic Error'],
  [20001, 'The user does not exist or password is incorrect'],
  [20002, 'The system is busy or code is invalid, please try again later'],
  [20003, 'The username already exists'],
])

export default CODE
