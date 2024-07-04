import {  IsBoolean,  IsInt,  IsString,} from 'class-validator';

export class CreateRegistroDto {
  @IsInt()
  usuarioId: number;

  @IsString()
  email: string;

  @IsString()
  contrasenia: string;

  @IsBoolean()
  administrador: boolean;
}
