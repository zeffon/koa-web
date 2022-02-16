export class HttpException extends Error {
  code: number;
  status: number;
  constructor(code: number) {
    super();
    this.code = code;
    this.status = 500;
  }
}

export class ParameterException extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 400;
  }
}

export class UnAuthenticatedException extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 401;
  }
}

export class ForbiddenException extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 403;
  }
}

export class NotFoundException extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 404;
  }
}

export class ServerErrorException extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 500;
  }
}

export class GetSuccess extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 200;
  }
}

export class CreateSuccess extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 201;
  }
}

export class UpdateSuccess extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 200;
  }
}

export class DeleteSuccess extends HttpException {
  constructor(code: number) {
    super(code);
    this.code = code;
    this.status = 200;
  }
}
