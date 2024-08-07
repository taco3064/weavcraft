import { IsEnum, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class AuthSupabaseSignOutBodyDTO {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export enum EnumAuthSupabaseProvider {
  GOOGLE = 'google',
}

export class AuthSupabaseSignInBodyDTO {
  @IsString()
  @JSONSchema({
    example: 'https://weavcraft.com/_auth',
  })
  redirectTo: string;
}

export class AuthSupabaseSignInResDTO {
  @IsString()
  @IsEnum(EnumAuthSupabaseProvider)
  provider: string;

  @IsString()
  @JSONSchema({
    example:
      'https://gyjdysppgxyuujassigu.supabase.co/auth/v1/authorize?provider=google&redirect_to=http%3A%2F%2Flocalhost%3A3000',
  })
  url: string;
}
