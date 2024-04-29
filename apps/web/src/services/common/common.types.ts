import MockAdapter from 'axios-mock-adapter';
import type { LowSync } from 'lowdb';
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

export type MockSetupOptions = {
  mock: MockAdapter;
  getDb: <D>(name: string) => LowSync<Record<string, D>>;
};

export type QueryFunctionParams<T extends QueryKey> = Pick<
  QueryFunctionContext<T | [...T, boolean]>,
  'queryKey'
>;
