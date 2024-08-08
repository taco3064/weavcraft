import 'reflect-metadata';

import * as _indexControllers from './controllers';
import configs from './configs';
import { HttpLogger } from './common/helpers/logger.helper';
import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import { initKoaApp } from './koaApp';
import { iocAdapter } from './iocAdapter';

export async function server() {
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
