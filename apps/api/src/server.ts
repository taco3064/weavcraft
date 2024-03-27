import 'reflect-metadata';
import configs from './configs';
import { iocAdapter } from './iocAdapter';
import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import * as _indexControllers from './controllers';
import { initKoaApp } from './koaApp';
import { HttpLogger } from './common/helpers/logger.helper';
import { INJECT_MONGO_CLIENT_DEMO } from '@weavcraft/modules';
import { DemoDbMongoClient } from './common/database/mongodb/testDB';

export async function server() {
  const demoMgoClient = iocAdapter.container.resolve<DemoDbMongoClient>(
    INJECT_MONGO_CLIENT_DEMO
  );
  await demoMgoClient.initialize();
  const controllers = Object.values(_indexControllers).values();

  const routingControllerOptions: RoutingControllersOptions = {
    controllers: [...controllers],
  };

  useContainer(iocAdapter);

  const app = initKoaApp(routingControllerOptions, true);

  const { host, port } = configs.app;

  const httpServer = app.listen(port, host, () => {
    HttpLogger.log.info(`http://${host}:${port}`);
  });

  return {
    app,
    httpServer,
  };
}
