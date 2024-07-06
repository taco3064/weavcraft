import { AuthLoginBySupabaseBodyDTO, AuthLoginResDTO } from '@weavcraft/common';
import { APIHelper } from '@weavcraft/helpers';
import { AuthUseCase } from '@weavcraft/modules';
import { Body, JsonController, Post } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { inject, injectable } from 'tsyringe';

@injectable()
@JsonController('/auth')
export class AuthController {
  constructor(
    @inject(AuthUseCase)
    private readonly authUseCase: AuthUseCase
  ) {}

  @Post('/login/supabase')
  @ResponseSchema(AuthLoginResDTO)
  @APIHelper.ApiResDataSchema(AuthLoginResDTO, {
    description: 'Login or create user by Supabase',
  })
  async loginBySupabase(@Body() body: AuthLoginBySupabaseBodyDTO) {
    const data = await this.authUseCase.loginOrCreateUserBySupabase(
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
