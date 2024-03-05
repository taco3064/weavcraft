import 'reflect-metadata';
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

  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 7001;

  const httpServer = app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });

  return {
    app,
    httpServer,
  };
}
