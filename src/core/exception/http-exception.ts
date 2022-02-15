export class HttpException extends Error {
  code: number;
  message: string;
  httpStatusCode: number;
  constructor(config: any = {}) {
    super();
    this.message = config.message;
    this.code = config.code;
    this.httpStatusCode = config.httpStatusCode;
  }
}

export class ParameterException extends HttpException {
  constructor(config: any = {}) {
    super();
    this.code = config.code;
    this.message = config.message;
    this.httpStatusCode = config.httpStatusCode;
  }
}

export class UnAuthenticatedException extends HttpException {
  constructor(config: any = {}) {
    super();
    this.code = config.code;
    this.message = config.message;
    this.httpStatusCode = config.httpStatusCode;
  }
}

export class ForbiddenException extends HttpException {
  constructor(config: any = {}) {
    super();
    this.code = config.code;
    this.message = config.message;
    this.httpStatusCode = config.httpStatusCode;
  }
}

export class NotFoundException extends HttpException {
  constructor(config: any = {}) {
    super();
    this.code = config.code;
    this.message = config.message;
    this.httpStatusCode = config.httpStatusCode;
  }
}

export class ServerErrorException extends HttpException {
  constructor(config: any = {}) {
    super();
    this.code = config.code;
    this.message = config.message;
    this.httpStatusCode = config.httpStatusCode;
  }
}

export class GetSuccess extends HttpException {
  GetSuccess(code: number) {
    this.code = code;
    this.httpStatusCode = 200;
  }
}

export class CreateSuccess extends HttpException {
  CreateSuccess(code: number) {
    this.code = code;
    this.httpStatusCode = 201;
  }
}

export class UpdateSuccess extends HttpException {
  UpdateSuccess(code: number) {
    this.code = code;
    this.httpStatusCode = 200;
  }
}

export class DeleteSuccess extends HttpException {
  DeleteSuccess(code: number) {
    this.code = code;
    this.httpStatusCode = 200;
  }
}
