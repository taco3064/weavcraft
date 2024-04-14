import { IsDateString, IsString } from 'class-validator';
import { TestData } from '../types';

export class TestDataDTO implements TestData {
  @IsString()
  id: string;

  @IsString()
  value: string;

  @IsDateString()
  updatedAt?: Date;

  @IsDateString()
  createdAt?: Date;
}
