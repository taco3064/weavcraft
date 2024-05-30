import { inject, injectable } from 'tsyringe';
import {
  Body,
  BodyParam,
  Ctx,
  JsonController,
  Post,
} from 'routing-controllers';
import { Context } from 'koa';
import {
  ApiResErrDTO,
  AuthSupabaseSignInBodyDTO,
  AuthSupabaseSignInResDTO,
  AuthSupabaseSignOutBodyDTO,
} from '@weavcraft/common';
import httpStatus from 'http-status';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { SupabaseClient } from '@supabase/supabase-js';
import { APIHelper } from '@weavcraft/helpers';
import {
  AuthSupabaseUseCase,
  INJECT_EXTERNAL_SUPABASE,
} from '@weavcraft/modules';

@ResponseSchema(ApiResErrDTO, {
  statusCode: httpStatus.BAD_REQUEST,
})
@OpenAPI({
  summary: 'Supabase Auth Controller',
  description: 'Use Supabase Auth Provider to sign in/out.',
})
@JsonController('/auth/supabase')
@injectable()
export class AuthSupabaseController {
  constructor(
    @inject(AuthSupabaseUseCase)
    private readonly authSupabaseUase: AuthSupabaseUseCase,
    @inject(INJECT_EXTERNAL_SUPABASE)
    private supabase: SupabaseClient
  ) {}

  @Post('/info')
  @APIHelper.ApiResDataListSchema(AuthSupabaseSignInResDTO)
  async getOAuthProviders(
    @Ctx() ctx: Context,
    @Body() body: AuthSupabaseSignInBodyDTO
  ) {
    const { redirectTo } = body;
    const data = await this.authSupabaseUase.getOAuthProviders(redirectTo);

    return APIHelper.apiResDataList<AuthSupabaseSignInResDTO>(data);
  }

  @OpenAPI({
    summary: '[For Test] run Supabase access signout',
  })
  @Post('/signOut')
  async signOut(@Ctx() ctx: Context, @Body() body: AuthSupabaseSignOutBodyDTO) {
    const { accessToken, refreshToken } = body;
    await this.supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    return await this.supabase.auth.signOut();
  }

  @OpenAPI({
    summary: '[For Test] validate Supabase access token',
  })
  @Post('/accessToken')
  async supabaseToken(
    @Ctx() ctx: Context,
    @BodyParam('accessToken') accessToken: string
  ) {
    const data = await this.supabase.auth.getUser(accessToken);
    return {
      data,
    };
  }

  @OpenAPI({
    summary: '[For Test] refresh Supabase session',
  })
  @Post('/refresh')
  async refresh(
    @Ctx() ctx: Context,
    @BodyParam('refreshToken') refreshToken: string
  ) {
    const data = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
    return {
      data,
    };
  }
}
