import { inject, injectable } from 'tsyringe';
import { JsonController, Get, QueryParam } from 'routing-controllers';
import { DemoUseCase } from '@weavcraft/modules';
import { APIHelper } from '@weavcraft/helpers';
import { ApiResDataDTO, HttpException, TestDataDTO } from '@weavcraft/common';
import httpStatus from 'http-status';

@injectable()
@JsonController('/app')
export class AppController {
  constructor(
    @inject(DemoUseCase)
    private readonly demoUCase: DemoUseCase
  ) {}

  @Get('/data')
  @APIHelper.ApiResDataSchema(TestDataDTO)
  async getAppData(): Promise<ApiResDataDTO<TestDataDTO>> {
    const data = await this.demoUCase.getTests();

    return APIHelper.apiResData<TestDataDTO>(data[0]);
  }

  @Get('/data/list')
  @APIHelper.ApiResDataListSchema(TestDataDTO, { status: httpStatus.CREATED })
  async getAppDataList(): Promise<ApiResDataDTO<TestDataDTO>> {
    const data = await this.demoUCase.getTests();
    return APIHelper.apiResDataList<TestDataDTO>(data, httpStatus.CREATED);
  }

  @Get('/data/paginated')
  @APIHelper.ApiResPaginatedSchema(TestDataDTO)
  async getAppPaginated() {
    const data = await this.demoUCase.getTests();
    return APIHelper.apiResPaginated<TestDataDTO>(data, data.length);
  }

  @Get('/error')
  async getError() {
    throw new HttpException('test http exception');
  }

  @Get('/query')
  async queryAppData(@QueryParam('id') id: string | number) {
    return { id };
  }
}
