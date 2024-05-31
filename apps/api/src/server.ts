import 'reflect-metadata';
import configs from './configs';
import { iocAdapter } from './iocAdapter';
import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import * as _indexControllers from './controllers';
import { initKoaApp } from './koaApp';
import { HttpLogger } from './common/helpers/logger.helper';
import { DemoDbMongoClient } from './common/database/mongodb/testDB';
import { INJECT_MONGO_CLIENT_DEMO } from '@weavcraft/modules';

export async function server() {
  const client = iocAdapter.container.resolve<DemoDbMongoClient>(
    INJECT_MONGO_CLIENT_DEMO
  );
  await client.connection.asPromise();
  const controllers = Object.values(_indexControllers).values();

  const routingControllerOptions: RoutingControllersOptions = {
    defaultErrorHandler: false,
    controllers: [...controllers],
  };

  useContainer(iocAdapter);

  const app = initKoaApp(routingControllerOptions, true);

  const { host, port } = configs.cfgs.app;

  const httpServer = app.listen(port, host, () => {
    HttpLogger.log.info(`http://${host}:${port}`);
  });

  return {
    app,
    httpServer,
  };
}
