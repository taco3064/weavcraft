import { testSchema } from '@weavcraft/repos';
import { ITestRepository } from '../types';
import { inject, injectable } from 'tsyringe';
import { INJECT_MONGO_CLIENT_DEMO } from '../../const';
import { BaseMongoClient } from '@weavcraft/repos';
import { Model } from 'mongoose';
import { TestData } from '@weavcraft/common';

@injectable()
export class TestRepository implements ITestRepository {
  private model: Model<TestData> = this.mongoClient.connection.model<TestData>(
    'test',
    testSchema
  );
  constructor(
    @inject(INJECT_MONGO_CLIENT_DEMO)
    private readonly mongoClient: BaseMongoClient
  ) {}

  async getTestDate(): Promise<TestData[]> {
    const tests = await this.model.find();
    const data = tests.map((test) => test.toJSON());
    return data;
  }
}

@injectable()
export class MockTestRepository implements ITestRepository {
  async getTestDate(): Promise<TestData[]> {
    return [
      {
        id: '1',
        value: 'mock',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
