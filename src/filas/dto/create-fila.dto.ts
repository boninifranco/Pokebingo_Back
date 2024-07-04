import { IsInt } from 'class-validator';

export class CreateFilaDto {
  @IsInt()
  cartonId: number;
}
