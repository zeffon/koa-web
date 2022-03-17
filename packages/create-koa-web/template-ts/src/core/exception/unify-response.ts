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
} from './http-exception'

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
   * @param code errorCode
   */
  serverErrorException(code: number | string) {
    throw new ServerErrorException(code)
  }
}