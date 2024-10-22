import { IsInt, IsOptional } from 'class-validator';

export class CreateCartonDto {
  @IsInt()
  idPartida: number;

  @IsInt()
  @IsOptional()
  idUsuario?: number;
}
