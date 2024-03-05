import { injectable } from 'tsyringe';
import { JsonController, Get, QueryParam } from 'routing-controllers';

@injectable()
@JsonController('/app')
export class AppController {
  @Get()
  async getAppInfo() {
    const result = {
      app: '@wwavcraft/api',
    };
    return result;
  }

  @Get('/query')
  async queryAppData(@QueryParam('id') id: string | number) {
    return { id };
  }
}