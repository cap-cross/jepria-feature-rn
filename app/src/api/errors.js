export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const NO_CREDENTIALS_ERROR = 'NO_CREDENTIALS_ERROR';
export const ACCESS_DENIED = 'ACCESS_DENIED';
export const SERVER_ERROR = 'SERVER_ERROR';

export class APIError extends Error{
  constructor(message, errorCode) {
    super(message);
    this.errorCode = errorCode;
  }
}