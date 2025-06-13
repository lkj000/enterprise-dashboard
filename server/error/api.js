const BaseError = require('./base');

class ApiError extends BaseError {
  constructor(message, statusCode) {
    super(message);
    this.response = {
      status: statusCode,
      message: message
    };
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

module.exports = {
  UnauthorizedError
};