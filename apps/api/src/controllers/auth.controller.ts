import { AuthLoginBySupabaseBodyDTO, AuthLoginResDTO } from '@weavcraft/common';
import { APIHelper } from '@weavcraft/helpers';
import { AuthUseCase } from '@weavcraft/modules';
import { Body, JsonController, Post } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';

@injectable()
@JsonController('/auth')
export class AuthController {
  constructor(
    @inject(AuthUseCase)
    private readonly authUseCase: AuthUseCase
  ) {}

  @Post('/login/supabase')
  @APIHelper.ApiResDataSchema(AuthLoginResDTO, {
    description: 'Login or signup user by Supabase',
  })
  async loginOrSignupBySupabase(@Body() body: AuthLoginBySupabaseBodyDTO) {
    const data = await this.authUseCase.supaLoginCreateOrUpdateUser(
      body.accessToken
    );
    return APIHelper.apiResData(data);
  }

  @Post('/logout')
  async logout() {
    return {
      success: true,
    };
  }
}
