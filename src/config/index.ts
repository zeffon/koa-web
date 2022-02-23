/**
 * 系统环境配置
 */
import { devConf } from './dev';
import { prodConf } from './prod';
import { testConf } from './tested';

const env = process.env.NODE_ENV;
const CONFIG =
  env === 'test' ? testConf : env === 'production' ? prodConf : devConf;

export default CONFIG;
