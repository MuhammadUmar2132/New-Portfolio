import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class StatDto {
  @IsString() value: string;
  @IsString() label: string;
}

export class UpdateProfileDto {
  @IsOptional() @IsString() avatarUrl?: string;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => StatDto) stats?: StatDto[];
}
