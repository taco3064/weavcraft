import 'reflect-metadata';
import configs from './configs';
import { iocAdapter } from './iocAdapter';
import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import * as _indexControllers from './controllers';
import { initKoaApp } from './koaApp';
import { HttpLogger } from './common/helpers/logger.helper';

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
