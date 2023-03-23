/**
 * Custom HTTP exception error code
 * [errorCode, 'errorCode message']
 */
const CODE = new Map([
  [0, 'ok'],

  [10000, 'Generic Exception'],
  [10400, 'The request format is incorrect.'],
  [10401, 'The token is invalid or expired.'],
  [10403, 'You do not have permission to access.'],
  [10404, 'Unable to find the requested resource.'],
  [10409, 'The data already exists.'],
  [10500, 'Server Unknown Exception.'],

  [20000, 'User Module Generic Error.'],
  [20001, 'The user does not exist or password is incorrect.'],
  [20002, 'No suitable login method found.'],
])

export default CODE
