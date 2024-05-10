/* eslint-disable @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import axios, { type AxiosError } from 'axios';
import { LowSync, MemorySync } from 'lowdb';
import { LocalStorage } from 'lowdb/browser';

import type { MockSetupOptions } from './common.types';

const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' });
const testDbs: Record<string, LowSync<any>> = {};
const tutorialDbs: Record<string, LowSync<any>> = {};

export function setupTutorialMock(
  name: string,
  initialData: Record<string, any>,
  mockFn: (options: MockSetupOptions) => void
) {
  if (global.window) {
    tutorialDbs[name] = new LowSync(
      new LocalStorage<Record<string, any>>(name),
      initialData
    );

    mockFn({
      mock,
      getDb: (name) => tutorialDbs[name],
    });
  }
}

export function setupTestMock(
  name: string,
  initialData: Record<string, any>,
  mockFn: (options: MockSetupOptions) => void
) {
  if (process.env.NODE_ENV === 'test') {
    testDbs[name] = new LowSync(
      new MemorySync<Record<string, any>>(),
      initialData
    );

    mockFn({
      mock,
      getDb: (name) => testDbs[name],
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
