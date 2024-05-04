import { AuthLoginBySupabaseBodyDTO } from '@weavcraft/common';
import { Body, Get, JsonController, Post } from 'routing-controllers';
import { injectable } from 'tsyringe';

@injectable()
@JsonController('/auth')
export class AuthController {
  @Post('/login/supabase')
  async loginBySupabase(@Body() body: AuthLoginBySupabaseBodyDTO) {
    return 'login';
  }

  @Get('/logout')
  async logout() {
    return 'logout';
  }
}
