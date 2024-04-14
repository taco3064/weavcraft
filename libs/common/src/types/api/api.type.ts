import { EnumErrorCode } from "../../enums";

export type ApiResStatus = {
  success: boolean;
  status: number;
};

export type ApiResPaginated<T = any> = ApiResStatus & {
  total: number;
  data: T[];
};

export type ApiResData<T = any> = ApiResStatus & {
  data: T | T[] | null;
};

export type ApiResErr = ApiResStatus & {
  errorCode: EnumErrorCode;
  message: string;
  description?: string;
  path: string;
  timestamp: string;
};