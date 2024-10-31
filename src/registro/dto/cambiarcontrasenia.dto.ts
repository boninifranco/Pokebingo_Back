import { IsString } from 'class-validator';

export class UpdateContraseniaDto {
  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;
}
