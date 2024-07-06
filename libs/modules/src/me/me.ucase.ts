import { Jwt } from '@weavcraft/helpers';
import { inject, injectable } from 'tsyringe';
import { INJECT_REPO_USER, INJECT_INSTANCE_JWT } from '../const';
import { UserRepository } from '../user';
import { UserData, HttpException } from '@weavcraft/common';

@injectable()
export class MeUseCase {
  constructor(
    @inject(INJECT_REPO_USER)
    private readonly userRepo: UserRepository,
    @inject(INJECT_INSTANCE_JWT)
    private readonly jwtHelper: Jwt
  ) {}

  async getMeByToken(token: string) {
    const { payload, err, errMsg } =
      this.jwtHelper.verifyToken<UserData>(token);
    if (err) {
      throw new HttpException(errMsg, 401);
    }
    return await this.userRepo.findById(payload.id);
  }
}
