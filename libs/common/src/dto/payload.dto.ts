import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PayloadData } from '../types/payload/payload.type';

export class PayloadDataDTO implements PayloadData {
  @IsMongoId()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsMongoId()
  updatedBy?: string;

  @IsMongoId()
  createdBy?: string;
}
