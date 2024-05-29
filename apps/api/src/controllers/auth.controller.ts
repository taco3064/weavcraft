import { AuthLoginBySupabaseBodyDTO, AuthLoginResDTO } from '@weavcraft/common';
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
  async loginBySupabase(
    @Body() body: AuthLoginBySupabaseBodyDTO
  ): Promise<AuthLoginResDTO> {
    return this.authUseCase.loginBySupabase(body.accessToken);
  }

  @Post('/logout')
  async logout() {
    return {
      success: true,
    };
  }
}
