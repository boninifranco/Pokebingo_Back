import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroDto } from './create-registro.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRegistroDto extends PartialType(CreateRegistroDto) {
  @IsString()
  email: string;

  @IsString()
  contrasenia: string;

  @IsOptional()
  @IsBoolean()
  administrador?: boolean;
}
