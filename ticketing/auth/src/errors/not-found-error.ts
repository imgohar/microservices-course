import { CustomError } from './custom-error';

export class NotFound extends CustomError {
  statusCode = 404;
  constructor() {
    super('Invaild Request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found' }];
  }
}
