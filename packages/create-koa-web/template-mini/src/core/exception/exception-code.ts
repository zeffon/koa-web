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
])

export default CODE
