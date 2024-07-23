import { inject, injectable } from 'tsyringe';
import { AuthSupabaseUseCase } from './auth.supabase.ucase';
import {
  AuthLoginResDTO,
  AuthLogoutResDTO,
  HttpException,
  ReqAuthLogoutDTO,
  ReqAuthRefreshAccessTokenDTO,
  SupabaseTokenFailedException,
  UserData,
} from '@weavcraft/common';
import {
  INJECT_INSTANCE_JWT,
  INJECT_REPO_REFRESH_TOKEN,
  INJECT_REPO_USER,
} from '../const';
import { Jwt } from '@weavcraft/helpers';
import { UserRepository, UserUseCase } from '../user';
import { RefreshTokenRepository } from './repos/auth.repo';

@injectable()
export class AuthUseCase {
  constructor(
    @inject(AuthSupabaseUseCase)
    private readonly authSupabaseUCase: AuthSupabaseUseCase,
    @inject(INJECT_REPO_USER)
    private readonly userRepo: UserRepository,
    @inject(INJECT_REPO_REFRESH_TOKEN)
    private readonly refreshTokenRepo: RefreshTokenRepository,
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
    return this.createToken(user);
  }

  async refreshAccessToken(params: ReqAuthRefreshAccessTokenDTO) {
    const { refreshToken } = params;
    const refreshTokenData = await this.refreshTokenRepo.findOneByToken(
      refreshToken
    );
    if (!refreshTokenData) {
      throw new HttpException('Invalid refresh token', 400);
    }
    const user = await this.userRepo.findById(refreshTokenData.userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const data = await this.createToken(user);
    await this.refreshTokenRepo.deleteByToken(refreshToken);
    return data;
  }

  async logoutByToken(params: ReqAuthLogoutDTO): Promise<AuthLogoutResDTO> {
    const { refreshToken } = params;
    const exist = await this.refreshTokenRepo.findOneByToken(refreshToken);
    if (exist) {
      await this.refreshTokenRepo.deleteByToken(refreshToken);
    }
    return {
      success: true,
    };
  }

  private async createToken(user: UserData): Promise<AuthLoginResDTO> {
    const accessToken = this.jwtHelper.createToken(user);
    const refreshToken = await this.refreshTokenRepo.createRefreshToken(
      user.id
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
