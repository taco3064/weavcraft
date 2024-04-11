import MockAdapter from 'axios-mock-adapter';
import type { Low } from 'lowdb';
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

export type MockSetupOptions<T> = { db: Low<T>; mock: MockAdapter };

export type QueryFunctionParams<T extends QueryKey> = Pick<
  QueryFunctionContext<T | [...T, boolean]>,
  'queryKey'
>;
