import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateMeetingDto {
  @IsString() name!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() phone?: string;
  @IsString() date!: string;
  @IsString() time!: string;
  @IsOptional() @IsString() message?: string;
}
