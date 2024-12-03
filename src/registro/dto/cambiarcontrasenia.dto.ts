import { IsOptional, IsString } from 'class-validator';

export class UpdateContraseniaDto {
  @IsString()
  @IsOptional()
  currentPassword: string;

  @IsString()
  newPassword: string;
  
}
