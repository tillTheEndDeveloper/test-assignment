class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  class ConflictError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ConflictError';
    }
  }
  
  class AuthenticationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AuthenticationError';
    }
  }
  
  class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
    }
  }
  
  export { ValidationError, ConflictError, AuthenticationError, NotFoundError };
  