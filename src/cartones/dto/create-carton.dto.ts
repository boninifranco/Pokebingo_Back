import { IsInt, IsOptional } from 'class-validator';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Registro } from 'src/registro/entities/registro.entity';

export class CreateCartonDto {
  @IsInt()
  idPartida: Partida;

  @IsInt()
  @IsOptional()
  idUsuario?: Registro;
}
