import { UserResponse } from '@supabase/supabase-js';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from './repos/user.repo';
import { INJECT_REPO_USER } from '../const';

@injectable()
export class UserUseCase {
  constructor(
    @inject(INJECT_REPO_USER)
    private userRepo: UserRepository
  ) {}

  async createBySupaUser(supaUserRes: UserResponse) {
    const { email } = this.validateCreateUserBySupa(supaUserRes);

    return await this.userRepo.create({ email });
  }

  private validateCreateUserBySupa(supaUserRes: UserResponse) {
    const supaUser = supaUserRes.data.user;
    if (!supaUser) {
      throw new Error('User not found');
    }
    const { email } = supaUser;
    if (!email) {
      throw new Error('Email not found');
    }
    return {
      email,
    };
  }
}
