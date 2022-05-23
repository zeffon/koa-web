/**
 * System env config
 */
import { devConf } from './dev'
import { prodConf } from './prod'
import { testConf } from './tested'

const env = process.env.NODE_ENV
const CONFIG =
  env === 'test' ? testConf : env === 'production' ? prodConf : devConf

export default CONFIG
