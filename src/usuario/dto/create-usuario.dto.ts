import { IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  apellido: string;

  @IsString()
  nombre: string;

  @IsString()
  dni: string;

  @IsString()
  celular: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}
