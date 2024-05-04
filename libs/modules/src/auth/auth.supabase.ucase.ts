import { inject, injectable } from 'tsyringe';
import { INJECT_EXTERNAL_SUPABASE } from '../const';
import { Provider, SupabaseClient } from '@supabase/supabase-js';
import { EnumAuthSupabaseProvider } from '@weavcraft/common';

@injectable()
export class AuthSupabaseUseCase {
  constructor(
    @inject(INJECT_EXTERNAL_SUPABASE)
    private readonly supabase: SupabaseClient
  ) {}

  async getOAuthProviders(redirectTo: string) {
    const data: {
      provider: Provider;
      url: string;
    }[] = [];
    for (const key in EnumAuthSupabaseProvider) {
      const provider =
        EnumAuthSupabaseProvider[key as keyof typeof EnumAuthSupabaseProvider];
      const auth = await this.supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo,
        },
      });
      if (!auth.error) {
        data.push(auth.data);
      }
    }
    return data;
  }
}
