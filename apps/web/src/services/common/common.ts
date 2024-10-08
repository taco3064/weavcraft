/* eslint-disable @typescript-eslint/no-explicit-any */
import * as idb from 'idb';
import MockAdapter from 'axios-mock-adapter';
import axios, { type AxiosError } from 'axios';
import { LocalStorage } from 'lowdb/browser';
import { LowSync, MemorySync } from 'lowdb';
import { compareVersions } from 'compare-versions';
import type { DBSchema, StoreNames } from 'idb';

import type { MockSetupOptions, ResponseData } from './common.types';

//* - IDB version management and auto-upgrade
export const Idb = (() => {
  const APP_VERSION_KEY = 'weavcraft-version';
  const IDB_VERSION_KEY = 'idb-version';

  const getVersion = () => {
    if (global.localStorage) {
      const currVersion = process.env.NEXT_PUBLIC_VERSION;
      const prevVersion = global.localStorage.getItem(APP_VERSION_KEY);

      if (!prevVersion) {
        global.localStorage.setItem(APP_VERSION_KEY, currVersion);
        global.localStorage.setItem(IDB_VERSION_KEY, '1');

        return 1;
      } else if (compareVersions(prevVersion, currVersion) < 0) {
        let idbVersion = Number(
          global.localStorage.getItem(IDB_VERSION_KEY) || '1'
        );

        global.localStorage.setItem(APP_VERSION_KEY, currVersion);
        global.localStorage.setItem(IDB_VERSION_KEY, `${++idbVersion}`);

        return idbVersion;
      }

      return Number(global.localStorage.getItem(IDB_VERSION_KEY) || '1');
    }

    return undefined;
  };

  return {
    get<Db extends DBSchema>(idbName: string, ...storeNames: StoreNames<Db>[]) {
      const idbVersion = getVersion();

      return !idbVersion
        ? null
        : idb.openDB<Db>(idbName, idbVersion, {
            upgrade(db) {
              const { objectStoreNames: stores } = db;

              storeNames.forEach((storeName) => {
                if (stores.contains(storeName)) {
                  db.deleteObjectStore(storeName);
                }

                db.createObjectStore(storeName);
              });
            },
          });
    },
  };
})();

//* - Mocks axios requests for Testing and Tutorial
export const Mock = (() => {
  const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' });
  const testDbs: Record<string, LowSync<any>> = {};
  const tutorialDbs: Record<string, LowSync<any>> = {};

  return {
    setupTesting(
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
    },

    setupTutorial(
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
    },
  };
})();

export function getMockData<T>(data: T): [number, ResponseData<T>] {
  return [
    200,
    {
      success: true,
      status: 200,
      data,
    },
  ];
}

//* - Catches ECONNREFUSED and 404 errors
export function withConnRefusedCatch<P, R = void>(
  serviceFn: (params: P) => Promise<ResponseData<R>>,
  initialResult?: R | ((data: R) => R)
): (params: P) => Promise<R> {
  const isInitialFunction = initialResult instanceof Function;

  return async (params) => {
    try {
      const { data } = await serviceFn(params);

      return isInitialFunction ? initialResult(data) : data;
    } catch (e) {
      const { code, response } = e as AxiosError;

      if (
        !isInitialFunction &&
        /^(development|test)$/.test(process.env.NODE_ENV) &&
        (code === 'ECONNREFUSED' || response?.status === 404)
      ) {
        return initialResult as R;
      }

      throw e;
    }
  };
}
