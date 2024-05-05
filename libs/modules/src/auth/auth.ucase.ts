import { inject, injectable } from 'tsyringe';
import { AuthSupabaseUseCase } from './auth.supabase.ucase';
import {
  AuthLoginResDTO,
  HttpException,
  SupabaseTokenFailedException,
} from '@weavcraft/common';
import { INJECT_INSTANCE_JWT } from '../const';
import { Jwt } from '@weavcraft/helpers';

@injectable()
export class AuthUseCase {
  constructor(
    @inject(AuthSupabaseUseCase)
    private readonly authSupabaseUCase: AuthSupabaseUseCase,
    @inject(INJECT_INSTANCE_JWT)
    private readonly jwtHelper: Jwt
  ) {}

  async loginBySupabase(token: string): Promise<AuthLoginResDTO> {
    const { data, error } = await this.authSupabaseUCase.validateToken(token);
    if (error) {
      throw new SupabaseTokenFailedException(error.message);
    }
    const accessToken = this.jwtHelper.createToken(data.user);
    return {
      accessToken,
    };
  }

  async logouByToken(token: string) {
    return 'oauth2 logout';
  }
}
