import { IsInt, IsNumber } from 'class-validator';

export class CreateFilaDto {
  @IsInt()
  cartonId: number;
  @IsNumber()
  aciertos: number = 0;
}

