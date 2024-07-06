import { ClassConstructor, IocAdapter } from 'routing-controllers';
import { DependencyContainer, container } from 'tsyringe';
import { IocLogger } from './common/helpers/logger.helper';
import {
  INJECT_EXTERNAL_SUPABASE,
  INJECT_INSTANCE_JWT,
  INJECT_MONGO_CLIENT,
  INJECT_MONGO_CLIENT_DEMO,
  INJECT_REPO_TEST,
  INJECT_REPO_USER,
  ITestRepository,
  TestRepository,
  UserRepository,
} from '@weavcraft/modules';
import supabaseClient from './common/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { Jwt } from '@weavcraft/helpers';
import jwtHelper from './common/helpers/jwt.helper';
import { DemoDbMongoClient } from './common/database/mongodb/testDB';
import { BaseMongoClient } from '@weavcraft/repos';
import { DevDbMongoClient } from './common/database/mongodb/devDB';

export class TsyringeAdapter implements IocAdapter {
  container: DependencyContainer;

  constructor() {
    this.container = container;
    this.init();
  }

  private init() {
    IocLogger.log.info('Initial DependencyContainer');

    this.container.registerInstance<Jwt>(INJECT_INSTANCE_JWT, jwtHelper);
    this.container.registerSingleton<BaseMongoClient>(
      INJECT_MONGO_CLIENT_DEMO,
      DemoDbMongoClient
    );
    this.container.registerSingleton<BaseMongoClient>(
      INJECT_MONGO_CLIENT,
      DevDbMongoClient
    );
    this.container.registerInstance<SupabaseClient>(
      INJECT_EXTERNAL_SUPABASE,
      supabaseClient
    );
    this.container.registerSingleton<ITestRepository>(
      INJECT_REPO_TEST,
      TestRepository
    );
    this.container.registerSingleton<UserRepository>(
      INJECT_REPO_USER,
      UserRepository
    );
  }

  get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.container.createChildContainer();
    return childContainer.resolve<T>(someClass);
  }
}

export const iocAdapter = new TsyringeAdapter();
