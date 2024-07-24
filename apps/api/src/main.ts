import 'reflect-metadata';
import { server } from './server';
import { LoggerHelper } from './common/helpers/logger.helper';
import configs, { Configs } from './configs';
import {
  RefreshTokenRepository,
  INJECT_REPO_REFRESH_TOKEN,
  INJECT_MONGO_CLIENT,
  INJECT_MONGO_CLIENT_DEMO,
} from '@weavcraft/modules';
import { iocAdapter } from './iocAdapter';
import { DevDbMongoClient } from './common/database/mongodb/devDB';
import { DemoDbMongoClient } from './common/database/mongodb/testDB';

async function main() {
  await preboot();

  const { httpServer } = await server();

  const closeProcesses = async (code = 1) => {
    httpServer.close(() => {
      LoggerHelper.log.info('Server closed');
    });
    iocAdapter.container.clearInstances();
    process.exit(code);
  };

  const successHandler = () => {
    LoggerHelper.log.info('SIGTERM received');
    closeProcesses(0);
  };

  const failureHandler = (error: any) => {
    LoggerHelper.log.error('Uncaught Exception');
    LoggerHelper.log.error(error);
    closeProcesses(1);
  };

  process.on('uncaughtException', failureHandler);
  process.on('unhandledRejection', failureHandler);

  process.on('SIGTERM', successHandler);
}

main();

async function preboot() {
  LoggerHelper.log.info('Server is starting...');
  await Configs.instance.loadGCPEnv();

  const demoClient = iocAdapter.container.resolve<DemoDbMongoClient>(
    INJECT_MONGO_CLIENT_DEMO
  );
  await demoClient.initialize();
  const client =
    iocAdapter.container.resolve<DevDbMongoClient>(INJECT_MONGO_CLIENT);
  await client.initialize();

  const refreshTokenRepo = iocAdapter.get<RefreshTokenRepository>(
    INJECT_REPO_REFRESH_TOKEN
  );
  await refreshTokenRepo.setRefreshTokenTTLIndex(
    configs.cfgs.auth.refreshTokenExpiredIn
  );
}
