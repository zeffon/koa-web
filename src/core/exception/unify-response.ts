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
} from './http-exception';

const SUCCESS_CODE = 0;

export class UnifyResponse {
  /**
   * 获取成功
   * @param code 错误码
   * @param message 自定义错误提示
   */
  getSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new GetSuccess(code, message);
  }

  /**
   * 创建成功
   * @param code 错误码
   * @param message 自定义错误提示
   */
  createSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new CreateSuccess(code, message);
  }

  /**
   * 更新成功
   * @param code 错误码
   * @param message 自定义错误提示
   */
  updateSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new UpdateSuccess(code, message);
  }

  /**
   * 删除成功
   * @param code 错误码
   * @param message 自定义错误提示
   */
  deleteSuccess({ code = SUCCESS_CODE, message = '' }) {
    throw new DeleteSuccess(code, message);
  }

  /**
   * 参数异常
   * @param code 错误码 | 自定义错误提示
   */
  parameterException(code: number | string) {
    throw new ParameterException(code);
  }

  /**
   * 授权异常
   * @param code 错误码
   */
  unAuthenticatedException(code: number) {
    throw new UnAuthenticatedException(code);
  }

  /**
   * 访问异常
   * @param code 错误码
   */
  forbiddenException(code: number) {
    throw new ForbiddenException(code);
  }

  /**
   * 资源获取不到异常
   * @param code 错误码
   */
  notFoundException(code: number) {
    throw new NotFoundException(code);
  }

  /**
   * 服务器异常
   * @param code 错误码
   */
  serverErrorException(code: number | string) {
    throw new ServerErrorException(code);
  }
}
