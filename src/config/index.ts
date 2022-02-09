import { devConf } from './dev';
import { prodConf } from './prod';

const config = process.env.NODE_ENV === 'production' ? prodConf : devConf;

export default config;
