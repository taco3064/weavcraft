import { ClassConstructor, IocAdapter } from 'routing-controllers';
import { DependencyContainer, container } from 'tsyringe';
import { IocLogger } from './common/helpers/logger.helper';
import {
  INJECT_MONGO_CLIENT_DEMO,
  INJECT_REPO_TEST,
  ITestRepository,
  TestRepository,
} from '@weavcraft/modules';
import { DemoDbMongoClient } from './common/database/mongodb/testDB';

export class TsyringeAdapter implements IocAdapter {
  container: DependencyContainer;

  constructor() {
    this.container = container;
    this.init();
  }

  private init() {
    IocLogger.log.info('Initial DependencyContainer');

    this.container.registerSingleton<DemoDbMongoClient>(
      INJECT_MONGO_CLIENT_DEMO,
      DemoDbMongoClient
    );

    this.container.registerSingleton<ITestRepository>(
      INJECT_REPO_TEST,
      TestRepository
    );
  }

  get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.container.createChildContainer();
    return childContainer.resolve<T>(someClass);
  }
}

export const iocAdapter = new TsyringeAdapter();
