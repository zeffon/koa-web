"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSuccess = exports.UpdateSuccess = exports.CreateSuccess = exports.GetSuccess = exports.Success = exports.ServerErrorException = exports.NotFoundException = exports.ForbiddenException = exports.UnAuthenticatedException = exports.ParameterException = exports.HttpException = void 0;
/**
 * Custom HTTP Exception
 */
class HttpException extends Error {
    constructor(code) {
        super();
        this.code = code;
        this.status = 500;
    }
}
exports.HttpException = HttpException;
class ParameterException extends HttpException {
    constructor(code) {
        super(code);
        this.code = code;
        this.status = 400;
    }
}
exports.ParameterException = ParameterException;
class UnAuthenticatedException extends HttpException {
    constructor(code) {
        super(code);
        this.code = code;
        this.status = 401;
    }
}
exports.UnAuthenticatedException = UnAuthenticatedException;
class ForbiddenException extends HttpException {
    constructor(code) {
        super(code);
        this.code = code;
        this.status = 403;
    }
}
exports.ForbiddenException = ForbiddenException;
class NotFoundException extends HttpException {
    constructor(code) {
        super(code);
        this.code = code;
        this.status = 404;
    }
}
exports.NotFoundException = NotFoundException;
class ServerErrorException extends HttpException {
    constructor(code) {
        super(code);
        this.code = code;
        this.status = 500;
    }
}
exports.ServerErrorException = ServerErrorException;
class Success extends HttpException {
    constructor(code, message) {
        super(code);
        this.code = code;
        this.status = 200;
        this.message = message;
    }
}
exports.Success = Success;
class GetSuccess extends Success {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.status = 200;
        this.message = message;
    }
}
exports.GetSuccess = GetSuccess;
class CreateSuccess extends Success {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.status = 201;
        this.message = message;
    }
}
exports.CreateSuccess = CreateSuccess;
class UpdateSuccess extends Success {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.status = 200;
        this.message = message;
    }
}
exports.UpdateSuccess = UpdateSuccess;
class DeleteSuccess extends Success {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.status = 200;
        this.message = message;
    }
}
exports.DeleteSuccess = DeleteSuccess;
//# sourceMappingURL=http-exception.js.map