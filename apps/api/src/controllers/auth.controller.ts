import { AuthLoginBySupabaseBodyDTO } from '@weavcraft/common';
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
  async loginBySupabase(@Body() body: AuthLoginBySupabaseBodyDTO) {
    return this.authUseCase.loginBySupabase(body.accessToken);
  }

  @Post('/logout')
  async logout() {
    return {
      success: true,
    };
  }
}
