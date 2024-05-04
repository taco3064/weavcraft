import { injectable } from 'tsyringe';

@injectable()
export class AuthUseCase {
  async loginBySupabase() {
    return '/login/supabase';
  }

  async logouByToken(token: string) {
    return 'oauth2 logout';
  }
}
