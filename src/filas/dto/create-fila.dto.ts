import { IsInt } from 'class-validator';

export class CreateFilaDto {
  @IsInt()
  filaId: number;
  @IsInt()
  filaAciertos: number;
  @IsInt()
  cartonId: number;
}
