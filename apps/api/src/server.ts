import 'reflect-metadata';
import configs from './configs';
import { TsyringeAdapter } from './iocAdapter';
import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import * as _indexControllers from './controllers';
import { initKoaApp } from './koaApp';

export async function server() {
  const iocAdapter = new TsyringeAdapter();
  const controllers = Object.values(_indexControllers).values();

  const routingControllerOptions: RoutingControllersOptions = {
    controllers: [...controllers],
  };

  useContainer(iocAdapter);

  const app = initKoaApp(routingControllerOptions, true);

  const { host, port } = configs.app;

  const httpServer = app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });

  return {
    app,
    httpServer,
  };
}
