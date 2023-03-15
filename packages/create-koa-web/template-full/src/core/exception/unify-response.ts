import {
  CreateSuccess,
  DeleteSuccess,
  ForbiddenException,
  GetSuccess,
  NotFoundException,
  ParameterException,
  ServerErrorException,
  UnAuthenticatedException,
  UpdateSuccess,
} from './http-exception'

/**
 * Unify Response
 */
export class UnifyResponse {
  /**
   * Get success
   * @param code errorCode
   * @param message errorCode message
   */
  getSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new GetSuccess(code, message)
  }

  /**
   * Create Success
   * @param code errorCode
   * @param message errorCode message
   */
  createSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new CreateSuccess(code, message)
  }

  /**
   * Update Success
   * @param code errorCode
   * @param message errorCode message
   */
  updateSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new UpdateSuccess(code, message)
  }

  /**
   * 删除成功
   * @param code errorCode
   * @param message errorCode message
   */
  deleteSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new DeleteSuccess(code, message)
  }

  /**
   * Parameter Exception
   * @param codeOrMessage errorCode | error message
   */
  parameterException(codeOrMessage: number | string) {
    throw new ParameterException(codeOrMessage)
  }

  /**
   * Un Authenticated Exception
   * @param code errorCode
   */
  unAuthenticatedException(code: number) {
    throw new UnAuthenticatedException(code)
  }

  /**
   * Forbidden Exception
   * @param code errorCode
   */
  forbiddenException(code: number) {
    throw new ForbiddenException(code)
  }

  /**
   * Not Found Exception
   * @param code errorCode
   */
  notFoundException(code: number) {
    throw new NotFoundException(code)
  }

  /**
   * server Error
   * @param codeOrMessage errorCode | error message
   */
  serverErrorException(codeOrMessage: number | string) {
    throw new ServerErrorException(codeOrMessage)
  }
}
