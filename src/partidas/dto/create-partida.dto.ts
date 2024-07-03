import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CreatePartidaDto {
  @IsInt()
  salaId: number;

  @IsString()
  horaInicio: string;

  @IsInt()
  cantidadCartones: number;

  @IsBoolean()
  estadoPartida: boolean;
}