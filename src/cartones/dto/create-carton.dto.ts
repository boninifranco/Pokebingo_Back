import { IsInt, IsOptional } from 'class-validator';

export class CreateCartonDto {
  @IsInt()
  //@IsOptional()
  idPartida: number;

  @IsInt()
  idUsuario: number;
}
