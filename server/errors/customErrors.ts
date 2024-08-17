import { ErrorTypes } from './errorTypes';
import { ErrorMessages } from './errorMessages';

abstract class BaseAppError extends Error {
  constructor(public message: ErrorMessages, public name: ErrorTypes) {
    super(message);
    this.name = name; 
    Error.captureStackTrace(this, this.constructor); 
  }
}

class ValidationError extends BaseAppError {
  constructor(message: ErrorMessages) {
    super(message, 'ValidationError');
  }
}

class ConflictError extends BaseAppError {
  constructor(message: ErrorMessages) {
    super(message, 'ConflictError');
  }
}

class AuthenticationError extends BaseAppError {
  constructor(message: ErrorMessages) {
    super(message, 'AuthenticationError');
  }
}

class NotFoundError extends BaseAppError {
  constructor(message: ErrorMessages) {
    super(message, 'NotFoundError');
  }
}

export { ValidationError, ConflictError, AuthenticationError, NotFoundError };
