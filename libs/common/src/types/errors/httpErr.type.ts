import { EnumErrorCode } from '../../enums';

export type HttpErr = {
  status: number;
  type: string;
  message: string;
  description?: string;
  errorCode?: EnumErrorCode;
  error?: any;
  stack?: string;
};
