import { devConf } from './dev';
import { prodConf } from './prod';

const CONFIG = process.env.NODE_ENV === 'production' ? prodConf : devConf;

export default CONFIG;
