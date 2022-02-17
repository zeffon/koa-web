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

export default class UnifyResponse {
  static getSuccess(code: number) {
    throw new GetSuccess(code);
  }

  static createSuccess(code: number) {
    throw new CreateSuccess(code);
  }

  static updateSuccess(code: number) {
    throw new UpdateSuccess(code);
  }

  static deleteSuccess(code: number) {
    throw new DeleteSuccess(code);
  }

  static parameterException(code: number | string) {
    throw new ParameterException(code);
  }

  static unAuthenticatedException(code: number) {
    throw new UnAuthenticatedException(code);
  }

  static forbiddenException(code: number) {
    throw new ForbiddenException(code);
  }

  static notFoundException(code: number) {
    throw new NotFoundException(code);
  }

  static serverErrorException(code: number) {
    throw new ServerErrorException(code);
  }
}
