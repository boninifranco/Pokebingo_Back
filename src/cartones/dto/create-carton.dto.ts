import { IsInt } from 'class-validator';

export class CreateCartonDto {
  @IsInt()
  idPartida: number;

  @IsInt()
  idUsuario: number = 0;
}
