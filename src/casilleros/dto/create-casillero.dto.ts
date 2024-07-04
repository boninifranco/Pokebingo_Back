import { IsBoolean, IsInt } from 'class-validator';

export class CreateCasilleroDto {
  @IsInt()
  filaId: number;
}
