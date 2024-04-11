/* eslint-disable @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import axios, { type AxiosError } from 'axios';
import { Low, Memory } from 'lowdb';

import type { MockSetupOptions } from './common.types';

const mock = new MockAdapter(axios);

export function setupTutorialMock<T>(
  initialData: T,
  mockFn: (options: MockSetupOptions<T>) => void
) {
  mockFn({
    mock,
    db: new Low(new Memory<T>(), initialData),
  });
}

export function setupTestMock<T>(
  initialData: T,
  mockFn: (options: MockSetupOptions<T>) => void
) {
  if (process.env.NODE_ENV === 'test') {
    mockFn({
      mock,
      db: new Low(new Memory<T>(), initialData),
    });
  }
}

export function withConnRefusedCatch<P extends any[], R = void>(
  serviceFn: (...args: P) => Promise<R>,
  initialResult?: R
): (...args: P) => Promise<R> {
  return async (...args: P) => {
    try {
      return await serviceFn(...args);
    } catch (e) {
      const { code, response } = e as AxiosError;

      if (
        /^(development|test)$/.test(process.env.NODE_ENV) &&
        (code === 'ECONNREFUSED' || response?.status === 404)
      ) {
        return initialResult as R;
      }

      throw e;
    }
  };
}
