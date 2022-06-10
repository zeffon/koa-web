import { UnifyResponse } from './exception/unify-response'

class InitGlobal {
  constructor() {}
  init() {
    global.UnifyResponse = new UnifyResponse()
    global.SUCCESS_CODE = 0
  }
}

export default new InitGlobal()
