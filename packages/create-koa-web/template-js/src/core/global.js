import { UnifyResponse } from './exception/unify-response.js'

class InitGlobal {
  constructor() {}
  init() {
    global.UnifyResponse = new UnifyResponse()
  }
}

export default new InitGlobal()
