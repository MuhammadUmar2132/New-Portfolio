import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, IsEnum, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsOptional() @IsString() longDescription?: string;
  @IsArray() @IsString({ each: true }) techStack: string[];
  @IsOptional() @IsString() githubUrl?: string;
  @IsOptional() @IsString() liveUrl?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsEnum(['fullstack', 'mobile', 'frontend', 'backend', 'other']) category: string;
  @IsBoolean() featured: boolean;
  @IsNumber() order: number;
}
