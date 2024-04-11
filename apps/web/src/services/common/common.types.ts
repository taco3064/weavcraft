import MockAdapter from 'axios-mock-adapter';
import type { Low } from 'lowdb';

export type MockSetupOptions<T> = { db: Low<T>; mock: MockAdapter };
