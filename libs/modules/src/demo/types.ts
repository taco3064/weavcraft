import { TestData } from '@weavcraft/common';

export interface ITestRepository {
  getTestDate(): Promise<TestData[]>;
}
