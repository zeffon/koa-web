import {
  CreateSuccess,
  DeleteSuccess,
  ForbiddenException,
  GetSuccess,
  NotFoundException,
  ParameterException,
  ServerErrorException,
  UnAuthenticatedException,
  UpdateSuccess
} from './http-exception.js'

const SUCCESS_CODE = 0

/**
 * Unify Response
 */
export class UnifyResponse {
  /**
   * Get success
   * @param code errorCode
   * @param message tip message
   */
  getSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new GetSuccess(code, message)
  }

  /**
   * Create Success
   * @param code errorCode
   * @param message tip message
   */
  createSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new CreateSuccess(code, message)
  }

  /**
   * Update Success
   * @param code errorCode
   * @param message tip message
   */
  updateSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new UpdateSuccess(code, message)
  }

  /**
   * 删除成功
   * @param code errorCode
   * @param message tip message
   */
  deleteSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new DeleteSuccess(code, message)
  }

  /**
   * Parameter Exception
   * @param codeOrMessage errorCode | tip message
   */
  parameterException(codeOrMessage) {
    throw new ParameterException(codeOrMessage)
  }

  /**
   * Un Authenticated Exception
   * @param code errorCode
   */
  unAuthenticatedException(code) {
    throw new UnAuthenticatedException(code)
  }

  /**
   * Forbidden Exception
   * @param code errorCode
   */
  forbiddenException(code) {
    throw new ForbiddenException(code)
  }

  /**
   * Not Found Exception
   * @param code errorCode
   */
  notFoundException(code) {
    throw new NotFoundException(code)
  }

  /**
   * server Error
   * @param code errorCode
   */
  serverErrorException(code) {
    throw new ServerErrorException(code)
  }
}
