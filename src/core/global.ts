import { Validator } from './validator/valid-tip';
import { UnifyResponse } from './exception/unify-response';

class InitGlobal {
  constructor() {}
  init() {
    global.Validator = Validator;
    global.UnifyResponse = UnifyResponse;
  }
}

export default new InitGlobal();
