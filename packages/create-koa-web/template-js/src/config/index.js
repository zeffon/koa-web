/**
 * System env config
 */
import { devConf } from './dev.js'
import { prodConf } from './prod.js'
import { testConf } from './tested.js'

const env = process.env.NODE_ENV
const CONFIG =
  env === 'test' ? testConf : env === 'production' ? prodConf : devConf

export default CONFIG
