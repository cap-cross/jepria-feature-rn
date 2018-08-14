export const AUTHENTIFICATION_ERROR = 'AUTHENTIFICATION_ERROR';
export const NO_CREDENTIALS_ERROR = 'NO_CREDENTIALS_ERROR';
export const SERVER_ERROR = 'SERVER_ERROR';

export class APIError extends Error{
  constructor(message, errorCode) {
    super(message);
    this.errorCode = errorCode;
  }
}