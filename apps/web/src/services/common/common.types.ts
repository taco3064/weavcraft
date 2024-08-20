import MockAdapter from 'axios-mock-adapter';
import type { LowSync } from 'lowdb';
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

//* - Common Service Types
export type MockSetupOptions = {
  mock: MockAdapter;
  getDb: <D>(name: string) => LowSync<Record<string, D>>;
};

export type QueryFunctionParams<T extends QueryKey = []> = Pick<
  QueryFunctionContext<T | [...T, boolean]>,
  'queryKey'
>;

export type ResponseData<T> = {
  success: boolean;
  status: number;
  data: T;
};
