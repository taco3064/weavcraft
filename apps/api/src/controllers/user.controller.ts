import { UserDataDTO } from '@weavcraft/common';
import { APIHelper } from '@weavcraft/helpers';
import { INJECT_REPO_USER, UserRepository } from '@weavcraft/modules';
import { Delete, Get, JsonController, Param } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { inject, injectable } from 'tsyringe';

@injectable()
@JsonController('/users')
export class UserController {
  constructor(
    @inject(INJECT_REPO_USER)
    private readonly userRepo: UserRepository
  ) {}

  @Get()
  @APIHelper.ApiResDataListSchema(UserDataDTO)
  async getUsers() {
    const data = await this.userRepo.findByQuery({});
    return APIHelper.apiResDataList(data);
  }

  @OpenAPI({
    summary: '[For Test] Delete user by id',
    deprecated: true,
  })
  @Delete('/:id')
  async deletedById(@Param('id') id: string) {
    const data = await this.userRepo.deleteById(id);
    return APIHelper.apiResData(data);
  }
}
