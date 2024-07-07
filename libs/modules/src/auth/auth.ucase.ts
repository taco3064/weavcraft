import { inject, injectable } from 'tsyringe';
import { AuthSupabaseUseCase } from './auth.supabase.ucase';
import {
  AuthLoginResDTO,
  HttpException,
  SupabaseTokenFailedException,
} from '@weavcraft/common';
import { INJECT_INSTANCE_JWT, INJECT_REPO_USER } from '../const';
import { Jwt } from '@weavcraft/helpers';
import { UserRepository, UserUseCase } from '../user';

@injectable()
export class AuthUseCase {
  constructor(
    @inject(AuthSupabaseUseCase)
    private readonly authSupabaseUCase: AuthSupabaseUseCase,
    @inject(INJECT_REPO_USER)
    private readonly userRepo: UserRepository,
    @inject(UserUseCase)
    private readonly userUCase: UserUseCase,
    @inject(INJECT_INSTANCE_JWT)
    private readonly jwtHelper: Jwt
  ) {}

  async supaLoginCreateOrUpdateUser(token: string): Promise<AuthLoginResDTO> {
    const supaUserRes = await this.authSupabaseUCase.validateToken(token);
    const { data, error } = supaUserRes;
    if (error) {
      throw new SupabaseTokenFailedException(error.message);
    }
    const email = data.user.email;
    if (!email) {
      throw new HttpException('Email not found', 400);
    }
    const users = await this.userRepo.findByQuery({ email });
    let user = users[0] ?? null;
    if (!user) {
      user = await this.userUCase.createBySupaUser(supaUserRes);
    } else {
      user = await this.userUCase.updateBySupaUser(user, supaUserRes);
    }
    const accessToken = this.jwtHelper.createToken(user);
    return {
      accessToken,
    };
  }

  async logouByToken(token: string) {
    return 'oauth2 logout';
  }
}
