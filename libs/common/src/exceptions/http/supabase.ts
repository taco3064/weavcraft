import * as httpStatus from 'http-status';
import { EnumErrorCode } from '../../enums';
import { HttpException } from './http';

export class SupabaseTokenFailedException extends HttpException {
  protected override _errorCode: EnumErrorCode =
    EnumErrorCode.PERMISSION_DENIED;

  constructor(message?: string) {
    const msg = message
      ? `Supabase accessToken failed!: ${message}`
      : 'Supabase accessToken failed!';
    super(msg, httpStatus.UNAUTHORIZED);
  }
}
