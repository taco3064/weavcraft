import { IsDate, IsDateString, IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { EnumHierarchyType, HierarchyData } from "../types/hierarchy";
import { PayloadDataDTO } from "./payload.dto";

export class HierarchyDataDTO implements HierarchyData {
  @IsMongoId()
  id: string;

  @IsString()
  title: string;

  @IsEnum(EnumHierarchyType)
  type: EnumHierarchyType;
  
  category: string;

  @IsString()
  @IsOptional()
  description?: string;

  superior?: string;

  @ValidateNested()
  payload?: PayloadDataDTO;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
