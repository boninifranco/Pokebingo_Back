import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class LoginDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  @MaxLength(15)
  @IsString()
  @IsOptional()
  password: string;
}