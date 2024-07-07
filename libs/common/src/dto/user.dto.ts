import {
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UserData } from '../types';

export class UserDataDTO implements UserData {
  @IsMongoId()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsString({ each: true })
  providers: string[];

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
