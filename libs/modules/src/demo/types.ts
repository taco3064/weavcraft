import { TestData } from '@weavcraft/repos';

export interface ITestRepository {
  getTestDate(): Promise<TestData[]>;
}
