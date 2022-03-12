import { UnifyResponse } from './exception/unify-response'

class InitGlobal {
  constructor() {}
  init() {
    global.UnifyResponse = new UnifyResponse()
  }
}

export default new InitGlobal()
