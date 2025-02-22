import { IsInt, IsString, IsBoolean, IsDate } from 'class-validator';

export class CreatePartidaDto {
  
  @IsString()
  horaInicio: string;

  @IsInt()
  cantidadCartones: number;

  @IsBoolean()
  estadoPartida: boolean;

  @IsInt()
  salaId: number;

}
