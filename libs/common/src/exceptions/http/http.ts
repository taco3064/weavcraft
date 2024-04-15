import { EnumErrorCode } from '../../enums';
import { HttpErr } from '../../types/errors';
import { BaseException } from '../base.exception';
import httpStatus = require('http-status');

export class HttpException extends BaseException {
  protected override _errorCode: EnumErrorCode = EnumErrorCode.HTTP_BASE_ERROR;

  get status() {
    return Number(this._status);
  }

  get type() {
    return (httpStatus as any)[this._status];
  }
  /**
   * Instantiate a plain HTTP Exception.
   *
   * @example
   * `throw new HttpException()`
   *
   */
  constructor(
    message?: string,
    protected _status: number = httpStatus.BAD_REQUEST,
    description?: string,
  ) {
    message = (message && message.length ? message : (httpStatus as any)[_status] ?? '') as string;
    super(message, description);
    this._status = _status;
  }

  get errorInfo(): HttpErr {
    return {
      status: this.status,
      type: this.type,
      message: this.message,
      description: this.description,
      errorCode: this.errorCode,
      error: this,
      stack: this.stack,
    };
  }
}
