import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';
import { UserData } from '../types';

export class UserDataDTO implements UserData {
  @IsMongoId()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  email: string;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
