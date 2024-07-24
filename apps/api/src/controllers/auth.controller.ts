import {
  AuthLoginBySupabaseBodyDTO,
  AuthLoginResDTO,
  AuthLogoutResDTO,
  ReqAuthLogoutDTO,
  ReqAuthRefreshAccessTokenDTO,
} from '@weavcraft/common';
import { APIHelper } from '@weavcraft/helpers';
import {
  AuthUseCase,
  INJECT_REPO_REFRESH_TOKEN,
  RefreshTokenRepository,
} from '@weavcraft/modules';
import { Body, Get, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { inject, injectable } from 'tsyringe';

@injectable()
@JsonController('/auth')
export class AuthController {
  constructor(
    @inject(AuthUseCase)
    private readonly authUseCase: AuthUseCase,
    @inject(INJECT_REPO_REFRESH_TOKEN)
    private readonly refreshTokenRepo: RefreshTokenRepository
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

  @Post('/refresh-access-token')
  @APIHelper.ApiResDataSchema(AuthLoginResDTO, {
    description: 'Refresh accessToken by refreshToken',
  })
  async refreshAccessToken(@Body() body: ReqAuthRefreshAccessTokenDTO) {
    const data = await this.authUseCase.refreshAccessToken(body);
    return APIHelper.apiResData(data);
  }

  @Post('/logout')
  @APIHelper.ApiResDataSchema(AuthLogoutResDTO, {
    description: 'Logout by refreshToken',
  })
  async logout(@Body() body: ReqAuthLogoutDTO) {
    const data = await this.authUseCase.logoutByToken(body);
    return APIHelper.apiResData(data);
  }

  @Get('/refresh-tokens')
  @OpenAPI({
    summary: '[For Test] Get all refresh tokens',
    deprecated: true,
  })
  async getRefreshTokens() {
    const data = await this.refreshTokenRepo.findAll();
    return APIHelper.apiResDataList(data);
  }
}
