//just extend the Error class and add a statusCode property to it

class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = CustomError;
  