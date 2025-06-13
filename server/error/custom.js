const BaseError = require('./base');

class TokenGenerationError extends BaseError {
  constructor(message) {
    super(message);
  }
}

class KeycloakError extends BaseError {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  TokenGenerationError,
  KeycloakError
};