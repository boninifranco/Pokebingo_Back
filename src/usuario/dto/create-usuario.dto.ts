import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  direccion: string;

  @IsNumber()
  puntos: number;

  @IsNumber()
  creditos: number;

  @IsNumber()
  cartonesComprados: number;
}
