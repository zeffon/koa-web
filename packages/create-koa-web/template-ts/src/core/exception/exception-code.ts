/**
 * Custom HTTP exception error code
 * [errorCode, 'tip message']
 */
const CODE = new Map([
  [0, 'ok'],
  [9999, 'Server Unknown Exception'],

  [10000, 'Generic Exception'],
  [10001, 'Generic parameter error'],
  [10002, 'The resource not found'],
  [10003, 'No suitable login method found'],
  [10004, 'The token is invalid or expired'],
  [10005, 'The user is not authorized'],
  [10006, 'Failed to login'],

  [20000, 'User Module Generic Error']
])

export default CODE
