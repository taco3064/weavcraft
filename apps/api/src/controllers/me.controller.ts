import { UserDataDTO } from '@weavcraft/common';
import { APIHelper } from '@weavcraft/helpers';
import { MeUseCase } from '@weavcraft/modules';
import { Context } from 'koa';
import { Ctx, Get, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { inject, injectable } from 'tsyringe';

@injectable()
@JsonController('/me')
export class MeController {
  constructor(
    @inject(MeUseCase)
    private readonly meUCase: MeUseCase
  ) {}

  @Get()
  @OpenAPI({
    security: [
      {
        authentication: [],
      },
    ],
  })
  @APIHelper.ApiResDataSchema(UserDataDTO)
  async getMe(@Ctx() ctx: Context) {
    const authorization = ctx.headers.authorization;
    const data = await this.meUCase.getMeByToken(authorization);
    return APIHelper.apiResData(data);
  }
}
