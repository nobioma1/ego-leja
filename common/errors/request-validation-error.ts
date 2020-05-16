import { ValidationErrorItem } from '@hapi/joi';

import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationErrorItem[]) {
    super('Invalid Request Parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((m) => {
      return {
        message: m.message.replace(/[^a-zA-Z0-9 ]/g, ''),
        field: m.context!.key,
      };
    });

    return formattedErrors;
  }
}
