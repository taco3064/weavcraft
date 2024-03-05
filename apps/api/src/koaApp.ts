import koa from 'koa';
import { RoutingControllersOptions, useKoaServer } from 'routing-controllers';
import { getSwaggerSpec } from './openapi';
import { koaSwagger } from 'koa2-swagger-ui';
import bodyParser = require('koa-bodyparser');

export function initKoaApp(
  routingControllerOptions: RoutingControllersOptions,
  apiDoc = true
) {
  const app = new koa();
  useKoaServer(app, routingControllerOptions);
  app.use(
    bodyParser({
      formLimit: '100mb',
      jsonLimit: '100mb',
      textLimit: '100mb',
      encoding: 'utf-8',
    })
  );
  const spec = getSwaggerSpec(routingControllerOptions);
  if (apiDoc && spec) {
    app.use(
      koaSwagger({
        routePrefix: '/docs',
        swaggerOptions: {
          spec,
        },
      })
    );
  }
  return app;
}
