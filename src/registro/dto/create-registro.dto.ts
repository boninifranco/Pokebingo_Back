import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateRegistroDto {
  @IsString()
  email: string;

  @IsString()
  contrasenia: string;
}
