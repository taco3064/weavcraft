import { UserResponse } from '@supabase/supabase-js';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from './repos/user.repo';
import { INJECT_REPO_USER } from '../const';
import { UserData } from '@weavcraft/common';

@injectable()
export class UserUseCase {
  constructor(
    @inject(INJECT_REPO_USER)
    private userRepo: UserRepository
  ) {}

  async createBySupaUser(supaUserRes: UserResponse) {
    const { email, provider, phone, full_name, avatar_url } =
      this.validateSupaUser(supaUserRes);
    const providers = provider ? [provider] : [];

    return this.userRepo.create({
      email,
      name: full_name,
      nickname: full_name,
      phone,
      providers,
      avatarUrl: avatar_url,
    });
  }

  async updateBySupaUser(user: UserData, supaUserRes: UserResponse) {
    const { full_name, provider, avatar_url } =
      this.validateSupaUser(supaUserRes);
    user.name = full_name;
    if (provider && !user.providers.includes(provider)) {
      user.providers.push(provider);
    }
    user.avatarUrl = avatar_url;
    user.updatedAt = new Date();
    const updated = await this.userRepo.updateById(user.id, user);
    return updated ?? user;
  }

  private validateSupaUser(supaUserRes: UserResponse) {
    const supaUser = supaUserRes.data.user;
    if (!supaUser) {
      throw new Error('User not found');
    }
    const { email, app_metadata, user_metadata, phone } = supaUser;
    if (!email) {
      throw new Error('Email not found');
    }
    const { provider } = app_metadata;
    const { full_name, avatar_url } = user_metadata;
    return {
      email,
      full_name,
      provider,
      phone,
      avatar_url,
    };
  }
}
