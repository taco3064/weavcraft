import { inject, injectable } from 'tsyringe';
import { JsonController, Get, QueryParam } from 'routing-controllers';
import { DemoUseCase } from '@weavcraft/modules';

@injectable()
@JsonController('/app')
export class AppController {
  constructor(
    @inject(DemoUseCase)
    private readonly demoUCase: DemoUseCase
  ) {}

  @Get()
  async getAppInfo() {
    const result = {
      app: '@wwavcraft/api',
    };
    return result;
  }

  @Get('/test')
  async getTestData() {
    return this.demoUCase.getTests();
  }

  @Get('/query')
  async queryAppData(@QueryParam('id') id: string | number) {
    return { id };
  }
}
