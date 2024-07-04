import { IsInt, IsString } from 'class-validator';

export class CreateCasilleroDto {
  @IsInt()
  filaId: number;

  @IsString()
  imagen: string = "";
}

